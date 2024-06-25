import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../styles/components/pages/securedPage/_devicee-list.scss';



const DeviceListComponent = ({ token }) => {
  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState(0);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      const query = `
        query Devices($page: Int!, $limit: Int!, $type: Int!, $search: String) {
          devices(page: $page, limit: $limit, type: $type, search: $search) {
            id
            name
            type
            status
          }
        }
      `;

      const variables = {
        page,
        limit,
        type,
        search,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      try {
        console.log('Request Payload:', { query, variables });
        const result = await axios.post(
          'https://core.roadwarez.net:44401/api/graphql',
          JSON.stringify({ query, variables }),
          config
        );

        if (result.data.errors) {
          setError(result.data.errors[0].message);
          console.error('GraphQL Errors:', result.data.errors);
        } else {
          setDevices(result.data.data.devices);
        }
      } catch (err) {
        setError(err.message);
        console.error('Network Error:', err);
      }
    };

    if (token) {
      fetchDevices();
    }
  }, [page, limit, type, search, token]);

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
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(Number(e.target.value))}>
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
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </label>
        <label>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
          />
        </label>
      </div>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.type} - {device.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(DeviceListComponent);