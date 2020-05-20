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
        pacientes[_userAddress].userProntuario.municipio = userData[8];
        pacientes[_userAddress].userProntuario.telefone = userData[9];
        pacientes[_userAddress].userProntuario.email = userData[10];
        pacientes[_userAddress].userProntuario.pais = userData[11];
        pacientes[_userAddress].userProntuario.cep = userData[12];
        pacientes[_userAddress].userProntuario.estado = userData[13];
        pacientes[_userAddress].userProntuario.orientacao_sexual = userData[14];
        pacientes[_userAddress].userProntuario.identidade_de_genero = userData[15];
        pacientes[_userAddress].userProntuario.bairro = userData[16];
        pacientes[_userAddress].userProntuario.logradouro = userData[17];
        pacientes[_userAddress].userProntuario.numero = userData[18];
        pacientes[_userAddress].userProntuario.complemento = userData[19];
        pacientes[_userAddress].userProntuario.referencia = userData[20];
        pacientes[_userAddress].userProntuario.area = userData[21];
        pacientes[_userAddress].userProntuario.microarea = userData[22];
        pacientes[_userAddress].userProntuario.nome_da_mae = userData[23];
        pacientes[_userAddress].userProntuario.nome_do_pai = userData[24];
        pacientes[_userAddress].userProntuario.estado_civil = userData[25];
        pacientes[_userAddress].userProntuario.NIS_PIS_PASEP = userData[26];        
        pacientes[_userAddress].userProntuario.ocupacao = userData[27];
        pacientes[_userAddress].userProntuario.escolaridade = userData[28];
        pacientes[_userAddress].userProntuario.tipo_sanguineo = userData[29];        
        pacientes[_userAddress].userProntuario.n_prontuario = userData[30];
    }



    /*function AdicionarPacientePersonal1(address _userAddress,
        string memory _name,
        string memory _cpf,
        string memory _rg,
        string memory _nome_social,
        string memory _dt_nasc,
        string memory _sexo,
        string memory _cor_raca,
        string memory _nacionalidade
       ) public {
        Paciente storage pc = pacientes[_userAddress];
        pc.userAddress = _userAddress;

        pacientes[_userAddress].userProntuario.name = _name;
        pacientes[_userAddress].userProntuario.cpf = _cpf;
        pacientes[_userAddress].userProntuario.rg = _rg;
        pacientes[_userAddress].userProntuario.nome_social = _nome_social;
        pacientes[_userAddress].userProntuario.dt_nasc = _dt_nasc;
        pacientes[_userAddress].userProntuario.sexo = _sexo;
        pacientes[_userAddress].userProntuario.cor_raca = _cor_raca;
        pacientes[_userAddress].userProntuario.nacionalidade = _nacionalidade;
    }

    function AdicionarPacientePersonal2(address _userAddress,
        string memory _municipio,
        string memory _telefone,
        string memory _email,
        string memory _pais,
        string  memory _cep,
        string memory _estado,
        string memory _orientacao_sexual,
        string memory _identidade_de_genero
       ) public {
        Paciente storage pc = pacientes[_userAddress];
        pc.userAddress = _userAddress;

        pacientes[_userAddress].userProntuario.municipio = _municipio;
        pacientes[_userAddress].userProntuario.telefone = _telefone;
        pacientes[_userAddress].userProntuario.email = _email;
        pacientes[_userAddress].userProntuario.pais = _pais;
        pacientes[_userAddress].userProntuario.cep = _cep;
        pacientes[_userAddress].userProntuario.estado = _estado;
        pacientes[_userAddress].userProntuario.orientacao_sexual = _orientacao_sexual;
        pacientes[_userAddress].userProntuario.identidade_de_genero = _identidade_de_genero;
    }

    function AdicionarPacienteAddress1(address _userAddress,
        string memory _bairro,
        string memory _logradouro,
        string memory _numero,
        string memory _complemento,
        string memory _referencia,
        string memory _area,
        string memory _microarea
       ) public {
        Paciente storage pc = pacientes[_userAddress];
        pc.userAddress = _userAddress;

        pacientes[_userAddress].userProntuario.bairro = _bairro;
        pacientes[_userAddress].userProntuario.logradouro = _logradouro;
        pacientes[_userAddress].userProntuario.numero = _numero;
        pacientes[_userAddress].userProntuario.complemento = _complemento;
        pacientes[_userAddress].userProntuario.referencia = _referencia;
        pacientes[_userAddress].userProntuario.area = _area;
        pacientes[_userAddress].userProntuario.microarea = _microarea;
    }

     function AdicionarPacienteOthers(address _userAddress,
        string memory _nome_da_mae,
        string memory _nome_do_pai,
        string memory _estado_civil,
        string memory _NIS_PIS_PASEP,
        string memory _n_prontuario,
        string memory _ocupacao,
        string memory _escolaridade,
        string memory _tipo_sanguineo
       ) public {
        Paciente storage pc = pacientes[_userAddress];
        pc.userAddress = _userAddress;

        pacientes[_userAddress].userProntuario.nome_da_mae = _nome_da_mae;
        pacientes[_userAddress].userProntuario.nome_do_pai = _nome_do_pai;
        pacientes[_userAddress].userProntuario.estado_civil = _estado_civil;
        pacientes[_userAddress].userProntuario.NIS_PIS_PASEP = _NIS_PIS_PASEP;
        pacientes[_userAddress].userProntuario.n_prontuario = _n_prontuario;
        pacientes[_userAddress].userProntuario.ocupacao = _ocupacao;
        pacientes[_userAddress].userProntuario.escolaridade = _escolaridade;
        pacientes[_userAddress].userProntuario.tipo_sanguineo = _tipo_sanguineo;
    }*/

}