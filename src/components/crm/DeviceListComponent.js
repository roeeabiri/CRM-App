import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../styles/components/pages/securedPage/_device-list.scss';

const DeviceListComponent = ({ token, refreshToken }) => {
  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState(0);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Fetch devices from the server with current filters
  const fetchDevices = async (currentToken) => {
    const query = `
      query (
        $account_lookup_id: String
        $start_date: String
        $end_date: String
        $filter_type: [Int]
        $is_online: Boolean
        $order_by: String
        $limit: Int
        $offset: Int
      ) {
        fetchDevices(
          accountLookupId: $account_lookup_id
          startDate: $start_date
          endDate: $end_date
          filterType: $filter_type
          isOnline: $is_online
          orderBy: $order_by
          limit: $limit
          offset: $offset
        ) {
          count
          results {
            lookupId
            deviceName
            machineId
            status
            country
            lastTelemetry {
              createdAt
            }
          }
        }
      }
    `;

    // Set variables based on current state
    const variables = {
      account_lookup_id: '',
      start_date: '',
      end_date: '',
      filter_type: type === 0 ? [0, 1, 2] : [type],
      is_online: null,
      order_by: '-last_message_date',
      limit,
      offset: (page - 1) * limit,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${currentToken}`
      },
    };

    try {
      const response = await axios.post(
        'https://core.roadwarez.net:44401/api/graphql',
        JSON.stringify({ query, variables }),
        config
      );

      if (response.data.errors) {
        setError(response.data.errors[0].message);
        console.error('GraphQL Errors:', response.data.errors);
      } else {
        setDevices(response.data.data.fetchDevices.results);
        setError(null); // Clear any previous errors
      }
    } catch (err) {
      setError(err.message);
      console.error('Network Error:', err);
    }
  };

  // Handle fetching devices with token validation and refresh
  const handleFetchDevices = async () => {
    try {
      await fetchDevices(token);
    } catch (err) {
      if (err.response && err.response.data.errors && err.response.data.errors[0].message === 'Signature has expired') {
        try {
          const newToken = await refreshToken();
          await fetchDevices(newToken);
        } catch (refreshError) {
          setError('Failed to refresh token');
          console.error('Token Refresh Error:', refreshError);
        }
      } else {
        setError(err.message);
        console.error('Fetch Devices Error:', err);
      }
    }
  };

  // Fetch devices when component mounts and when dependencies change
  useEffect(() => {
    if (token) {
      handleFetchDevices();
    }
  }, [page, limit, type, search, token]);

  // Filter devices based on search input
  const filteredDevices = devices.filter(device =>
    device.deviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="device-list">
      <h2>Devices</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="controls">
        <label>
          Search:
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setError(null); // Clear error when input changes
            }}
          />
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => {
            setType(Number(e.target.value));
            setPage(1); // Reset page when type changes
            setError(null); // Clear error when input changes
          }}>
            <option value={0}>All</option>
            <option value={1}>Static</option>
            <option value={2}>Dynamic</option>
          </select>
        </label>
        <label>
          Limit:
          <input
            type="number"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // Reset page when limit changes
              setError(null); // Clear error when input changes
            }}
          />
        </label>
        <label>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => {
              setPage(Number(e.target.value));
              setError(null); // Clear error when input changes
            }}
          />
        </label>
      </div>
      <ul>
        {filteredDevices.map((device) => (
          <li key={device.lookupId}>
            <div className="device">
              <h3 className="device-name">{device.deviceName}</h3>
              <p className="device-details">Status: <span>{device.status}</span></p>
              <p className="device-details">Country: <span>{device.country}</span></p>
              <p className="device-details">Last Telemetry: <span>{device.lastTelemetry?.createdAt || 'N/A'}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps)(DeviceListComponent);
