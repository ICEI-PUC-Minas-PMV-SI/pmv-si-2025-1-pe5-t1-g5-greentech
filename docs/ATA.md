Etapa 2 

**Lucas Brandão Guedes - Etapa 2**
Fui responsável por desenvolver os protocolos FTP e NFS, contudo antes de definirmos o que cada membro do grupo iria fazer, tentei fazer a criação do webserver na nuvem para familiarização com o sistema de virtualização EC2 da Amazon.
Após ter definido o que cada um teria que fazer, foquei no FTP Server, onde tive dificuldades para aprender a configurar por linhas de comando, tive também muita instabilidade no funcionamento, fazendo com que a comunicação entre o servidor cliente caisse. Este problema foi solucionado iniciando uma maquina virtual nova e começando a configuração do zero.
Para o protocolo NFS não foi tão dificil, mas configurações foram mais simples tanto no computador servidor como no cliente.
Praticamente não nos reunimos para atuar juntos o que prejudicou o desenvolvimento, mas no penultimo dia consegui me reuni por umas 5 horas com o Gabriel para preenchimento do documento, criação dos videos, e para nos ajudarmos nos detalhes das atividades de nossa competência.
Se caso não lembrar de preencher, ainda falta para o uultimo dia a edição dos videos para uni-los em um, e conferencia do documento para ajustes pontuais.

**Gabriel Amorim Santos Maia - Etapa 2**
Fui responsável pela configuração dos serviços de Active Directory, DHCP e DNS, seguindo as orientações da documentação do projeto GreenTECH. Durante a execução, enfrentei uma pequena dificuldade na configuração do Gateway, devido à ausência de um equipamento dedicado; entretanto, a situação foi corrigida ao configurar o servidor 192.168.2.254 como Gateway, separando-o do DNS, que permaneceu em 192.168.2.10.

Embora tenham ocorrido pequenos contratempos que limitaram minha participação direta em algumas reuniões, estive presente sempre que possível, prestando apoio contínuo à equipe. Auxiliei a colega Daniela na configuração do banco de dados e participei de chamadas de alinhamento do projeto com o Lucas.

Também fui responsável pela edição do vídeo de apresentação e pelo envio dos documentos correspondentes a esta etapa do projeto.

**Daniela Sofia Fernandes de Assis - Etapa 2**
Na etapa 2, eu criei o banco de dados no AWS Aurora, configurando-o de maneira adequada para a comunicação com outros serviços. Em seguida, criei uma instância EC2, que funcionará como o servidor de aplicação. Para garantir que a instância EC2 pudesse acessar o banco de dados, realizei a configuração necessária para permitir a comunicação entre eles. Após isso, acessei a instância EC2 remotamente e instalei o MySQL, conectando-a ao banco de dados RDS. Com isso, garanti que o servidor e o banco de dados estivessem integrados e prontos para as próximas etapas do projeto.

A experiência foi desafiadora, com muitos erros e acertos ao longo do processo. Para superar as dificuldades, busquei tutoriais no YouTube, estudei o conteúdo no Canvas da PUC, recorri às IAs e assisti as aulas extras. Além disso, a ajuda dos meus colegas foi fundamental para tornar o processo mais fácil e facilitar a resolução dos problemas que surgiram.

**João**
Na etapa 2 ajudei a configurar o AD e o GPO. Criando domínios e e configurando as políticas para determinados grupos. Também configurei um server DHCP em linux Ubuntu, uma implementação não tão completa com todos os ranges como a do Gabriel.

**Tales Hein**
Configurei o servidor HTTP em uma instância EC2 na AWS usando Nginx e docker para o deploy. Também escrevi a documentação expondo como foi feito o setup e o vídeo que demonstra como isso foi feito.

______________________________________________________________________________________________________________________________________________________________________________________________________________________________

Etapa 3 

**Gabriel Amorim Santos Maia - Etapa 3**
Durante esta etapa do projeto, fui responsável pela configuração e implementação do Zabbix Server em ambiente AWS (EC2) e configuração do Zabbix-Agent na VM Servidor Active Directory, garantindo sua correta comunicação com os demais Hosts criados em máquinas virtuais (VMs) pelos demais integrantes do grupo. A criação e disponibilização desses Hosts para integração ao ambiente de monitoramento foi definida como responsabilidade individual de cada membro do grupo. Cada integrante ficou encarregado de configurar seu ambiente para estabelecer comunicação com o servidor Zabbix.

Mantive-me disponível durante todo o processo para prestar suporte técnico, orientações e esclarecimentos de dúvidas relacionadas à configuração dos agentes Zabbix e integração dos Hosts.

Atuei diretamente na criação do ambiente de visualização de monitoramento, realizando a integração com o Grafana para desenvolvimento de dashboards personalizados, As ações tomadas seguiram o plano definido em reunião com o professor orientador do projeto.

**João**
Na etapa 3 atuei na revisão e formatação do texto do documento, se assegurando que ele estivesse coerente, com informações atualizadas do projeto e legível.

**Tales Hein - Etapa 3**
Fui responsável por configurar o servidor HTTP para o acompanhamento via Zabbix. O serviço HTTP está numa instância EC2 e foi instalado o zabbix agent nessa instância para que um servidor externo possa puxar os dados. Foram feitas alterações nos exemplos de teste rodando nos conteiners do serviço http para que os recursos fossem utilizados e a observabilidade trazida pelo zabbix fosse evidenciada.

**Lucas Brandão Guedes - Etapa 3**
Fui responsável por instalar o zabbix agent na máquina local onde estava o protocolo FTP e NFS rodando. Fiz a comunicação com o zabbix server na máquina virtual no ambiente da AWS criado pelo Gabriel Amorim. 
Contudo para aprendizado também instalei o Zabbix Appliance na minha máquina local e monitorei os dados da mesma.

**Daniela Sofia Fernandes de Assis - Etapa 3**
Levando em conta a instância EC2 criada na etapa 2, instalei o Zabbix-Agent nela para que comunicasse com o Zabbix Server configurado pelo Gabriel Amorim. A conexão foi realizada com sucesso e a EC2 pode ser monitorada pelo Zabbix. Por fim, participei da construção do documento do grupo.

______________________________________________________________________________________________________________________________________________________________________________________________________________________________

Etapa 4 

**Lucas Brandão Guedes - Etapa 4**
Durante esta etapa do projeto, fui responsável pela formatação do documento no padrão ABNT. Consegui adiantar bastante. Contudo faltou incluir os novos conteúdos da etapa 4, pois o grupo ainda nao tinha enviado para ser inserido no documento até o dia deste apontamento 07/06/25 15h40.
As 22h12 do dia 08/06/25 foi possivel concluir a formatação até esta etapa onde os demais membro do grupo enviaram suas atribuições.

**Tales Hein - Etapa 4**
Nesta etapa fui responsável por fazer a análise de vulnerabilidade da infraestrutura AWS implementada pelo grupo até o momento. Foi feita a analise com base no OWASP Top Ten, sendo identificados problemas principalmente em relação à uma implementação mais segura potencialmente usando IAM Roles, o use de TLS (HTTPS) para encripção da comunicação, e um controle mais forte sobre o acesso das instâncias e do RDS, usando sub-redes privadas e grupos de segurança mais rígidos.

**Daniela Sofia Fernandes de Assis - Etapa 4**
Nesta etapa do projeto, eu elaborei a Política de Segurança da Informação (PSI), definindo as diretrizes e responsabilidades relacionadas à proteção de dados dentro do escopo do projeto. O documento foi construído com base em dois modelos de referência: o modelo fornecido pelo governo brasileiro através do Programa de Privacidade e Segurança da Informação (PPSI) e o modelo apresentado no material de apoio da disciplina.

Além disso, desenvolvi uma cartilha de segurança da informação com o objetivo de orientar os integrantes do projeto sobre boas práticas no uso de sistemas e no tratamento de dados pessoais e sensíveis. A cartilha apresenta o conteúdo de forma clara e acessível, buscando promover a conscientização e fortalecer a cultura de segurança da informação entre todos os envolvidos.

**João**
Na etapa 4, atuei na escrita de resumos e na formatação do documento, garantindo que as informações estivessem claras, organizadas e de acordo com os objetivos do projeto.

**Gabriel Amorim - Etapa 4**
Nesta etapa do projeto, o grupo foi responsável pela elaboração de documentações técnicas e descritivas, essenciais para organização do trabalho. Acompanhei o processo de criação desses documento, porém sem intervir diretamente em sua elaboração, conciliando esse acompanhamento com os estudos dos microfundamentos da disciplina. Essa abordagem permitiu manter o alinhamento com os objetivos da etapa, mesmo sem participação prática na produção textual. 
______________________________________________________________________________________________________________________________________________________________________________________________________________________________
Etapa 5 

**Daniela Sofia Fernandes de Assis - Etapa 5**
Na etapa 5, etapa final do projeto, fui responsável pela escrita do resumo e conclusão do relatório técnico, além de ajudar na revisão dos slides e na concepção da aplicação backend.

**Tales Hein - Etapa 5**
Fiz a implementação do back-end e frontend que foram usados para o exemplo do deploy em infraestrutura cloud. Também ao passo que fazia o desenvolvimento também organizei e executei o deploy das aplicações.

**Gabriel Amorim - Etapa 5**
Na etapa 5, participei ativamente no apoio à criação da apresentação utilizando o Canva, colaborando com o grupo na construção de cada slide e na atualização do documento com as informações mais recentes. Também fui responsável pela apresentação da parte referente ao monitoramento e ao ambiente AWS.

**Lucas Brandão Guedes - Etapa 5**
Fui responsável por formatar o documento oficial em artigo técnico nos padrões ABNT e conforme modelo da PUC Minas.
