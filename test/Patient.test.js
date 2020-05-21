/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const EthCrypto = require("eth-crypto")
const Paciente = artifacts.require("./Paciente.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Paciente", ([owner]) => {
  let patient;

  before(async () => {
    patient = await Paciente.deployed();
  });

  describe("patient", async () => {
    before(async () => {
      const newAccount = await web3.eth.accounts.create();

      result = await patient.AdicionarPaciente(newAccount.address, [
        "José Pereira",
        "034.456.864-45",
        "28799999",
        "José Pereira",
        "11/11/2011",
        "Masculino",
        "Parda",
        "Brasileira",
        "(11) 99999-9999",
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
        "XXXXXXXX"
      ]);
    });

    it("creates a patient", async () => {
      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.name, "José Pereira", "name is correct");
      assert.equal(event.cpf, "034.456.864-45", "cpf is correct");
      assert.equal(event.rg,"28799999", "rg is corrent");
      assert.equal(event.nome_social,"José Pereira","nome social is correct");
      assert.equal(event.dt_nasc,"11/11/2011","Data de nascimento is correct")
      assert.equal(event.sexo,"Masculino", "Sexo is correct")
      assert.equal(event.cor_raca,"Parda","Cor/Raça is corrent")
      assert.equal(event.nacionalidade, "Brasileira", "Nacionalidade is correct")
      assert.equal(event.telefone,"(11) 99999-9999","Telefone is correct")
      assert.equal(event.email,"test@email.com","Email is correct")
      assert.equal(event.orientacao_sexual,"Heterosexual","Orientação sexual is correct")
      assert.equal(event.identidade_de_genero,"N/A","Identidade de genero is correct")
      assert.equal(event.nome_da_mae,"Fulana","Nome da mae is correct")
      assert.equal(event.nome_do_pai,"Fulano","Nome do pai is correct")
      assert.equal(event.estado_civil,"Solteiro","Estado civil is correct")
      assert.equal(event.NIS_PIS_PASEP,"9999999", "NIS_PIS_PASEP is correct")
      assert.equal(event.ocupacao,"Desempregado","Ocupacao is correct")
      assert.equal(event.tipo_sanguineo,"O+","Tipo sanguineo is corerct")
      assert.equal(event.pais,"Brasil", "pais is correct"),
      assert.equal(event.municipio,"N/A","municipio is correct")
      assert.equal(event.estado,"DF","Estado is correct")
      assert.equal(event.bairro,"Asa sul","Bairro is correct")
      assert.equal(event.logradouro,"N/A","Logradouro is correct")
      assert.equal(event.numero,"923", "Numero is correct")
      assert.equal(event.cep,"70111999","CEP is correct")
      assert.equal(event.complemento,"Prédio Y","Complemento is correct")
      assert.equal(event.referencia,"ao lado de X", "Referencia is correct")
      assert.equal(event.area,"Z", "Area is correct")
      assert.equal(event.microarea,"W","Microarea is correct")
      assert.equal(event.n_prontuario,"XXXXXXXX", "N_prontuario is correct")
    });
  });
});
