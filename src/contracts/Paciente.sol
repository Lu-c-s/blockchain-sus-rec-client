pragma solidity 0.6.7;
pragma experimental ABIEncoderV2;

import './Prontuario.sol';

contract Paciente {
   
    struct PacienteData {    
        Prontuario.data userProntuario;      
    }

    mapping(address => PacienteData) public pacientes;

    function AdicionarPaciente(address _userAddress , string[] memory userData) public{
        pacientes[_userAddress].userProntuario.name = userData[0];
        pacientes[_userAddress].userProntuario.cpf = userData[1];
        pacientes[_userAddress].userProntuario.rg = userData[2];
        pacientes[_userAddress].userProntuario.nome_social = userData[3];
        pacientes[_userAddress].userProntuario.dt_nasc = userData[4];
        pacientes[_userAddress].userProntuario.sexo = userData[5];
        pacientes[_userAddress].userProntuario.cor_raca = userData[6];
        pacientes[_userAddress].userProntuario.nacionalidade = userData[7];
        pacientes[_userAddress].userProntuario.telefone = userData[8];
        pacientes[_userAddress].userProntuario.email = userData[9];
        pacientes[_userAddress].userProntuario.orientacao_sexual = userData[10];
        pacientes[_userAddress].userProntuario.identidade_de_genero = userData[11];
        pacientes[_userAddress].userProntuario.nome_da_mae = userData[12];
        pacientes[_userAddress].userProntuario.nome_do_pai = userData[13];
        pacientes[_userAddress].userProntuario.estado_civil = userData[14];
        pacientes[_userAddress].userProntuario.NIS_PIS_PASEP = userData[15];
        pacientes[_userAddress].userProntuario.ocupacao = userData[16];
        pacientes[_userAddress].userProntuario.escolaridade = userData[17];
        pacientes[_userAddress].userProntuario.tipo_sanguineo = userData[18];
        pacientes[_userAddress].userProntuario.pais = userData[19];
        pacientes[_userAddress].userProntuario.municipio = userData[20];
        pacientes[_userAddress].userProntuario.estado = userData[21];
        pacientes[_userAddress].userProntuario.bairro = userData[22];
        pacientes[_userAddress].userProntuario.logradouro = userData[23];
        pacientes[_userAddress].userProntuario.numero = userData[24];
        pacientes[_userAddress].userProntuario.cep = userData[25];
        pacientes[_userAddress].userProntuario.complemento = userData[26];        
        pacientes[_userAddress].userProntuario.referencia = userData[27];
        pacientes[_userAddress].userProntuario.area = userData[28];
        pacientes[_userAddress].userProntuario.microarea = userData[29];        
        pacientes[_userAddress].userProntuario.n_prontuario = userData[30];
    }
}