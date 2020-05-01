const Patient = artifacts.require("./Patient.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Patient", ([deployer, seller, buyer]) => {
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

  describe("products", async () => {
    let result, patientCount;

    before(async () => {
      result = await patient.addPatient("José Pereira", "034.456.864-45");
      patientCount = await patient.patientCount();
    });

    it("creates a patient", async () => {
      // SUCCESS
      assert.equal(patientCount, 1);
      const event = result.logs[0].args;

      assert.equal(
        event.id.toNumber(),
        patientCount.toNumber(),
        "id is correct"
      );
      assert.equal(event.name, "José Pereira", "name is correct");
      assert.equal(event.cpf, "034.456.864-45", "cpf is correct");

      // FAILURE: Product must have a name
      // await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: Product must have a price
      //await await marketplace.createProduct('iPhone X', 0, { from: seller }).should.be.rejected;
    });
  });
});
