pragma solidity ^0.5.0;

contract Patient{
    mapping(address => PatientInfo) public patients;

    struct PatientInfo {
        string name;
        string cpf;
        bool set;
    }

    event PatientCreated(
        string name,
        string cpf,
        bool set
    );

    function addPatient(address _userAddress, string memory _name, string memory _cpf) public {
        PatientInfo storage patient = patients[_userAddress];
        require(!patient.set);
        // Create the product
        patients[_userAddress] = PatientInfo({
            name: _name,
            cpf: _cpf,
            set: true
        });
        // Trigger an event
        emit PatientCreated(_name, _cpf, true);
    }

}