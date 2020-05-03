pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract System {
    struct Prontuario {
        string name;
    }

    struct Paciente {
        address userAddress;
        Prontuario userProntuario;
        bool set;
    }

    mapping(address => Paciente) public pacientes;

    function AdicionarPaciente(address _userAddress, string memory _userName) public {
        Paciente storage pc = pacientes[_userAddress];
        // Check that the user did not already exist:
        require(!pc.set, "Already set the patient");
        
        pc.userAddress = _userAddress;
        pc.set = true;
        pc.userProntuario = Prontuario(_userName);
        
        //Prontuario memory p = Prontuario(_userName);
        //Store the user
        /*pacientes[_userAddress] = Paciente({
            userAddress: _userAddress,
            userProntuario: p,
            set: true
        });*/
    }
}