import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";
import { ImWhatsapp } from "react-icons/im";
import { MdEmail } from "react-icons/md";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function List() {
  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const initializeAsync = async () => {
      const response = await api.get("incidents");

      setIncidents([...response.data]);
      setLoading(false);
    };

    initializeAsync();
  }, [incidents, loading]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="list-container">
      <div className="navbar">
        <img src={logoImg} alt="Be The Hero" />
        <Link className="go-back" to="/">
          <FiArrowLeft size={16} color="#0087C6" />
          Voltar para home
        </Link>
      </div>
      <div className="list-content">
        <h1>Casos cadastrados</h1>
        {incidents.map((incident, index) => (
          <div key={index} className="list-card">
            <strong>{incident.name}</strong>
            <p className="title">{incident.title}</p>
            <p className="description">{incident.description}</p>
            <p className="money">
              {incident.value.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
              <p className="btn-contact">
                <ImWhatsapp size={16} color="#0087C6" />
                {incident.whatsapp}
              </p>
              <p className="btn-contact">
                <MdEmail size={16} color="#0087C6" />
                {incident.email}
              </p>
            </div>
        ))}
      </div>
      <div className="space" />
    </div>
  );
}
