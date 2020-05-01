pragma solidity ^0.5.0;

contract Patient{
    uint public patientCount = 0;
    address[] newPatients;

    mapping(uint => PatientInfo) public patients;

    struct PatientInfo {
        uint id;
        string name;
        string cpf;
        address ownerAddress;
    }

    event PatientCreated(
        uint id,
        string name,
        string cpf,
        address ownerAddress
    );

    function addPatient(string memory _name, string memory _cpf) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        patientCount ++;
        // Create the product
        patients[patientCount] = PatientInfo(patientCount, _name,_cpf,msg.sender);
        // Trigger an event
        emit PatientCreated(patientCount, _name, _cpf, msg.sender);
    }

}