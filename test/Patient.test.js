/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const Patient = artifacts.require("./Patient.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Patient", ([creator, newAddress]) => {
  let patient;

  before(async () => {
    patient = await Patient.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await patient.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe("patient", async () => {
    before(async () => {
      result = await patient.addPatient(newAddress, [
        "José Pereira",
        "034.456.864-45",
      ]);
    });

    it("creates a patient", async () => {
      // SUCCESS

      assert.equal(
        event.id.toNumber(),
        patientCount.toNumber(),
        "id is correct"
      );

      assert.equal(event.name, "José Pereira", "name is correct");
      assert.equal(event.cpf, "034.456.864-45", "cpf is correct");
    });
  });
});
