import AddHostsForm from "../../components/AddHostsForm/AddHostsForm";
import "./Hosts.css";
import React from 'react';
import Hosts_Table from '../../components/HostsTable';
import Hosts_Data from '../../data/Hosts'

const Hosts = () => {
  return (
    <div>
      <h2>Here is a list of Hosts in your database.</h2>
      <Hosts_Table items={Hosts_Data}/>
      <AddHostsForm />
    </div>
  );
};

export default Hosts;
