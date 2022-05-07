import React from "react";
import AddHostsForm from "../../components/AddHostsForm/AddHostsForm";
import HostsTable from "../../components/HostsTable";
import HostsData from "../../data/Hosts";
import Header from "../../components/Header/Header";

import "./Hosts.css";

const Hosts = () => {
  return (
    <div>
      <Header title='Hosts' />
      <h2>Here is a list of Hosts in your database.</h2>
      <HostsTable items={HostsData} />
      <AddHostsForm />
    </div>
  );
};

export default Hosts;
