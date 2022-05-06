import AddHostsForm from "../../components/AddHostsForm/AddHostsForm";
import "./Hosts.css";
import React from 'react';
import HostsTable from '../../components/HostsTable';
import HostsData from '../../data/Hosts'

const Hosts = () => {
  return (
    <div>
      <h2>Here is a list of Hosts in your database.</h2>
      <HostsTable items={HostsData}/>
      <AddHostsForm />
    </div>
  );
};

export default Hosts;
