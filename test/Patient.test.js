/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const EthCrypto = require("eth-crypto");
const Paciente = artifacts.require("./Paciente.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Paciente", () => {
  before(async () => {
    this.patient = await Paciente.deployed();
  });

  it("deploys successfully", async () => {
    const address = await this.patient.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  describe("patient", async () => {
    before(async () => {
      const newAccount = await web3.eth.accounts.create();
      result = await this.patient.AdicionarPaciente(newAccount.address, [
        "José Pereira",
        "03445686445",
        "28799999",
        "José Pereira",
        "11/11/2011",
        "Masculino",
        "Parda",
        "Brasileira",
        "11999999999",
        "test@email.com",
        "Heterosexual",
        "N/A",
        "Fulana",
        "Fulano",
        "Solteiro",
        "9999999",
        "Desempregado",
        "O+",
        "Brasil",
        "N/A",
        "DF",
        "Asa sul",
        "N/A",
        "923",
        "70111999",
        "Prédio Y",
        "ao lado de X",
        "Z",
        "W",
        "V",
        "XXXXXXXX",
      ]);

      console.log("result", result);
    });

    it("creates a patient", async () => {
      // SUCCESS
      const event = result.logs[0].args;
      assert.equal(event.name, "José Pereira", "name is correct");
      assert.equal(event.cpf, "03445686445", "cpf is correct");
    });
  });
});
