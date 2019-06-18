create database api_mysql;

use api_mysql;

create Table if not exists users (
id int(10) unsigned not null auto_increment,
username varchar(50) collate utf8_unicode_ci not null,
password varchar(200) collate utf8_unicode_ci not null,
email varchar(100) collate utf8_unicode_ci not null,
created_at TIMESTAMP default current_timestamp,
updated_at TIMESTAMP default current_timestamp 
on update current_timestamp,
primary key(id),
constraint users_email_UQ unique (email)

)engine=InnoDB default character set=utf8;

describe users


/*
CREATE USER 'nombre_usuario'@'localhost' IDENTIFIED BY 'tu_contrasena';
GRANT ALL PRIVILEGES ON * . * TO 'nombre_usuario'@'localhost';
FLUSH PRIVILEGES;
*/