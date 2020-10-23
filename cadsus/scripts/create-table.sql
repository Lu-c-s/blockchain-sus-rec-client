use rds;

drop table if exists `pacientes`;

create table `pacientes` (
	`name` varchar(100) not null,
    `cpf` varchar(11) not null primary key,
    `rg` varchar(9) not null,
    `nome_social` varchar(100) not null,
    `dt_nasc` varchar(10) not null,
    `sexo` varchar(20) not null,
    `cor_raca` varchar(100) not null,
    `nacionalidade` varchar(100) not null,
    `municipio` varchar(100) not null,
    `telefone` varchar(100) not null,
    `email` varchar(100) not null,
    `pais` varchar(100) not null,
    `cep` varchar(100) not null,
    `estado` varchar(100) not null,
    `orientacao_sexual` varchar(100) not null,
    `identidad_de_genero` varchar(100) not null,
    `bairro` varchar(100) not null,
    `logradouro` varchar(100) not null,
    `numero` varchar(5) not null,
    `complemente` varchar(100) not null,
    `referencia` varchar(3) not null,
    `area` varchar(100) not null,
    `microarea` varchar(100) not null,
    `nome_da_mae` varchar(100) not null,
    `nome_do_pai` varchar(100) not null,
    `estado_civil` varchar(100) not null,
    `NIS_PIS_PASEP` varchar(100) not null,
    `ocupacao` varchar(100) not null,
    `escolaridade` varchar(100) not null,
    `tipo_sanguineo` varchar(100) not null,
    `n_prontuario` varchar(100) not null
);

