import Style from './../../assets/styles/occurrences.module.css';
import React, { useState, useEffect } from "react";
import Menu from '../../componentes/menu';
import api from '../../services/api';
import { useRouter } from "next/router";
import { format } from 'date-fns';


export default function GetAll() {
    const [occurrences, setOccurrences] = useState([]);

    const obterNomeIncidente = (occurrence_type) => {
        switch (occurrence_type) {
          case 1:
            return 'Atropelamento';
          case 2:
            return 'Deslizamento';
          case 3:
            return 'Colisão frontal';
          case 4:
            return 'Capotagem';
          case 5:
            return 'Saída de pista';
          case 6:
            return 'Batida em objeto fixo';
          case 7:
            return 'Veículo avariado';
          case 8:
            return 'Colisão com motocicletas';
          case 9:
            return 'Colisão no mesmo sentido ou transversal';
          case 10:
            return 'Construção';
          default:
            return null; // Valor não encontrado
        }
      };

    useEffect(() => {
      fetchOccurrences();
    }, []);
  
    // Função para buscar todas as ocorrências
    async function fetchOccurrences() {
      try {
        const response = await api.get('/occurrences');
        const { occurrences } = response.data;
        setOccurrences(occurrences);
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <div className={`${Style.background}`}>
        <div className={`container ${Style.containerG}`}>
          <Menu />
          <div>
            <h2 className={`${Style.title}`}>listagem de incidentes</h2>
            <button className={`${Style.btnAtualizar}`} onClick={fetchOccurrences}><b>Atualizar</b></button>
          </div>
          <br />
          <table className={`${Style.table}`}>
            <thead className={`${Style.thead}`}>
              <tr>
                <th>ID</th>
                <th>Data / Hora</th>
                <th>Local</th>
                <th>Tipo de Incidente</th>
                <th>KM</th>
              </tr>
            </thead>
            <tbody className={`${Style.tbody}`}>
              {occurrences.map((occurrence) => (
                <tr key={occurrence.id}>
                  <td>{occurrence.id}</td>
                  <td>{format(new Date(occurrence.registered_at.replace(/-/g, '/')), 'dd/MM/yyyy HH:mm:ss')}</td>
                  <td>{occurrence.local}</td>
                  <td>{obterNomeIncidente(occurrence.occurrence_type)}</td>
                  <td>{occurrence.km}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }