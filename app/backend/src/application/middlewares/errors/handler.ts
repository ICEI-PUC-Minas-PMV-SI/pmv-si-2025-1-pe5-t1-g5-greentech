import ValidationError from "@models/errors/validation";
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

const prismaStatusCodeMap = <Code extends string>(code: Code) => {
  const codeMap: Record<string, number> = {
    P1000: 500, // Autenticação falhou com o banco
    P1001: 500, // Banco não encontrado (Falha porta/url)
    P1002: 500, // Timeout com o banco
    P1003: 500, // Banco de dados não encontrado (ex: mpa)
    P1008: 500, // Timeout
    P1010: 500, // Acesso negado com o banco de dados
    P1011: 500, // Erro conexão TLS
    P1012: 500, // Prisma schema inválido (npx prisma generate)
    P1013: 500, // Url de conexão com o banco inválida
    P1014: 500, // Tabela/coluna não existe no banco de dados
    P1015: 500, // Feature do prisma não suportada pelo banco de dados
    P1016: 500, // Raw Query com número incorreto de parametros
    P1017: 500, // Servidor fechou a conexão
    P2000: 400, // Valor maior que o limite da coluna no banco de dados
    P2001: 400, // Registro para o filtro da query (where) não existe
    P2002: 400, // Chave única falhou
    P2003: 400, // Chave estrangeira falhou
    P2004: 400, // Constraint falhou
    P2005: 400, // O tipo do dado não corresponde com a coluna no banco
    P2006: 400, // Valor fornecido não corresponde a coluna no banco
    P2007: 400, // Erro validação de dados
    P2008: 500, // Fala ao converter a query
    P2009: 500, // Falha para validar a query
    P2010: 500, // Raw Query falhou
    P2011: 400, // Violação de constraint null
    P2012: 400, // Valor obrigatório ausente
    P2013: 400, // Argumento obrigatório ausente no objeto
    P2014: 400, // Alteração viola relação entre tabelas
    P2015: 400, // Registro relacionado não encontrado
    P2016: 500, // Erro na interpretação da query
    P2017: 500, // Os registros para o relacionamento pai-filho não estão conectados no model
    P2018: 500, // A conexão obrigatória dos registros não foi encontrada
    P2019: 500, // Input error
    P2020: 400, // Valor fora do range do tipo
    P2021: 500, // A tabela não existe no banco de dados atual
    P2022: 500, // A coluna não existe no banco de dados atual
    P2023: 500, // Dados da coluna inconsistentes
    P2024: 500, // Timeout enquanto buscada nova conexão para a connection pool (http://pris.ly/d/connection-pool)
    P2025: 404, // A operação falhou por causa que depende de um ou mais registros que eram obrigatórios mas não foram encontrados
    P2026: 500, // O provider do banco de dados atual não suporta alguma feature da query usada
    P2027: 500, // Multiplos erros ocorreram no banco de dados durante a execução da query
    P2028: 500, // Erro na API de transação
    P2033: 400, // O número usado na query não cabe em um Int 64 bit
    P2034: 500, // Transaction falhou devido a um conflito de gravação ou um "deadlock". Tente novamente
  };

  return codeMap[code] || 500;
};

export default function errorHandler<Req extends Request, Res extends Response>(
  error: unknown,
  _req: Req,
  res: Res,
  _next: NextFunction,
) {
  res.status(500);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(prismaStatusCodeMap(error.code)).json({ message: error.message });
    return;
  }
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    res.json({ message: error.message });
    return;
  }
  if (error instanceof ValidationError) {
    res.status(error.status).json(error.issues);
    return;
  }
  if (error instanceof HttpError) {
    res.status(error.status).json(error);
    return;
  }
  if (error instanceof Error) {
    res.json(error);
    return;
  }

  res.json({ message: "Internal Server Error" });
}