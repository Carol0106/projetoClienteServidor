import Style from './../../assets/styles/occurrences.module.css';
import React, { useState, useEffect } from "react";
import Menu from '../../componentes/menu';
import api from '../../services/api';
import { useRouter } from 'next/router';

export default function Update() {
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [tipo, setTipo] = useState('');
    const [km, setKm] = useState('');
    const [local, setLocal] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { id } = router.query;
    console.log("TESTE", id);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

        // const obterIdIncidente = (tipo) => {
        //     switch (tipo) {
        //       case 'Atropelamento':
        //         return 1;
        //       case 'Deslizamento':
        //         return 2;
        //       case 'ColisaoFrontal':
        //         return 3;
        //       case 'Capotagem':
        //         return 4;
        //       case 'SaidaDePista':
        //         return 5;
        //       case 'BatidaEmObjetoFixo':
        //         return 6;
        //       case 'VeiculoAvariado':
        //         return 7;
        //       case 'ColisaoComMotocicletas':
        //         return 8;
        //       case 'ColisaoNoMesmoSentidoOuTransversal':
        //         return 9;
        //       case 'Construcao':
        //         return 10;
        //       default:
        //         return null;
        //     }
        // }

        // // Recuperar a string JSON armazenada no localStorage
        // const userDataJson = localStorage.getItem('userData');
        // const userData = JSON.parse(userDataJson);

        // Recupera token armazenado no localStorage
        const token = localStorage.getItem('token');
    
        // // Verificar se há um token no armazenamento local
        // if (!token) {
        //     router.push('/login');
        // }

        // const occurrence_type = obterIdIncidente(tipo);
        // const registered_at = `${data}T${hora}.000Z`;
        
        // if (data === '' || hora === '' || tipo === '' ||  km === '' || local === '') {
        //     setErrorMessage('Por favor, preencha todos os campos!');
        //     return;
        // }
        
        // if (local.length < 1 || local.length > 125) {
        //     setErrorMessage('O local deve conter entre 1 e 125 caracteres.');
        //   return;
        // }
      
        // if (km.length < 1 || km.length > 9999) {
        //     setErrorMessage('O km deve conter entre 1 e 9999 caracteres.');
        //   return;
        // }

        // const dataHoraEscolhida = new Date(registered_at);
        // const dataAtual = new Date();

        // if (dataHoraEscolhida > dataAtual) {
        //     setErrorMessage('A data e a hora não podem ser um valor futuro.');
        //   return;
        // } 

        // const dados = {
        //     registered_at,
        //     local,
        //     occurrence_type,
        //     km,
        //     user_id: userData.id
        // };
        // console.log('dadosss', dados);
        useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await api.get(`/occurrences/${id}`);
                if (response.status === 200) {
                  const { data, hora, tipo, km, local } = response.data;
                  setData(data);
                  setHora(hora);
                  setTipo(tipo);
                  setKm(km);
                  setLocal(local);
                } else {
                  setErrorMessage(response.data.message);
                }
              } catch (error) {
                // Lida com erros na requisição
                console.error('Erro na requisição:', error);
                setErrorMessage('Ocorreu um erro ao carregar os dados da ocorrência.');
              }
            };
        
            if (id) {
              fetchData();
            }
          }, [id]);
        
          const handleSubmit = async (event) => {
            // Resto do código...
          };
        
          const clearFields = () => {
            setData('');
            setHora('');
            setKm('');
            setLocal('');
          }
        
          return (
            <div className={`${Style.background}`}>
              {successMessage && <div className={`${Style.mensagemS}`}>{successMessage}</div>}
              {errorMessage && <div className={`${Style.mensagemE}`}>{errorMessage}</div>}
              <div className={`container ${Style.containerP}`}>
                <Menu />
                <form onSubmit={handleSubmit}>
                  <h2 className={`${Style.title}`}>Atualizar incidente {id}</h2>
                  <div className={`${Style.divRow}`}>
                    <label className={`${Style.label}`} htmlFor="data">Data</label>
                    <input className={`${Style.input}`} type="date" id="data" name="data" value={data} onChange={(event) => setData(event.target.value)}/>
        
                    <label className={`${Style.label}`} htmlFor="hora">Hora</label>
                    <input className={`${Style.input}`} type="time" id="hora" name="hora" value={hora} onChange={(event) => setHora(event.target.value)} step="2"/>
                  </div>
                  <div className={`${Style.divRow}`}>
                    <label className={`${Style.label}`} htmlFor="tipo_incidente">Tipo</label>
                    <select className={`${Style.inputS}`} id="tipo_incidente" name="tipo_incidente" value={tipo} onChange={(event) => setTipo(event.target.value)}>
                      <option value="Atropelamento">Atropelamento</option>
                      <option value="Deslizamento">Deslizamento</option>
                      <option value="ColisaoFrontal">Colisão frontal</option>
                      <option value="Capotagem">Capotagem</option>
                      <option value="SaidaDePista">Saída de pista</option>
                      <option value="BatidaEmObjetoFixo">Batida em objeto fixo</option>
                      <option value="VeiculoAvariado">Veículo avariado</option>
                      <option value="ColisaoComMotocicletas">Colisão com motocicletas</option>
                      <option value="ColisaoNoMesmoSentidoOuTransversal">Colisão no mesmo sentido ou transversal</option>
                      <option value="Construcao">Construção</option>
                    </select>
        
                    <label style={{ marginLeft: '25px'}} className={`${Style.label}`} htmlFor="km">KM</label>
                    <input className={`${Style.input}`} type="text" id="km" name="km" value={km} onChange={(event) => setKm(event.target.value)}/>
                  </div>
                  <div className={`${Style.divRow}`}>
                    <label className={`${Style.label}`} htmlFor="local">Local</label>
                    <input className={`${Style.input}`} type="text" id="local" name="local" value={local} onChange={(event) => setLocal(event.target.value)}/>
                  </div>
        
                  <div className={`row ${Style.botoes}`}>
                    <button type="submit" className={`${Style.btn} ${Style.btsalvar}`}>Cadastrar</button>
                    <a href="/home" className={`${Style.btn} ${Style.btcancelar}`}>Cancelar</a>
                  </div>
                </form>
              </div>
            </div>
          );
}