import { AppConnectionId } from "../app-connection/app-connection";
import { CollectionId } from "../collections/collection";
import { CollectionVersionId } from "../collections/collection-version";
import { FileId } from "../file/file";
import { FlowRunId } from "../flow-run/flow-run";
import { FlowId } from "../flows/flow";
import { FlowVersionId } from "../flows/flow-version";
import { InstanceId } from "../instance";
import { ApId } from "./id-generator";

export class ActivepiecesError extends Error {
  constructor(public error: ErrorParams, message?: string) {
    super(error.code + (message ? `: ${message}` : ""));
  }
}

type ErrorParams =
  | CollectionNotFoundErrorParams
  | CollectionVersionNotFoundErrorParams
  | ConfigNotFoundErrorParams
  | ExistingUserErrorParams
  | FileNotFoundErrorParams
  | FlowNotFoundErrorParams
  | FlowRunNotFoundErrorParams
  | FlowVersionNotFoundErrorParams
  | InstanceNotFoundErrorParams
  | InvalidBearerTokenParams
  | InvalidCredentialsErrorParams
  | JobRemovalFailureErrorParams
  | PieceNotFoundErrorParams
  | PieceTriggerNotFoundErrorParams
  | StepNotFoundErrorParams
  | AppConnectionNotFoundErrorParams
  | InvalidJwtTokenErrorParams
  | FlowRunQuotaExeceededErrorParams
  | SystemInvalidErrorParams
  | SystemPropNotDefinedErrorParams;

export interface BaseErrorParams<T, V> {
  code: T;
  params: V;
}

export type InvalidBearerTokenParams = BaseErrorParams<ErrorCode.INVALID_BEARER_TOKEN, Record<string, null>>;

export type FileNotFoundErrorParams = BaseErrorParams<ErrorCode.FILE_NOT_FOUND, { id: FileId }>;

export type AppConnectionNotFoundErrorParams = BaseErrorParams<
  ErrorCode.APP_CONNECTION_NOT_FOUND,
  {
    id: AppConnectionId;
  }
>;

export type FlowNotFoundErrorParams = BaseErrorParams<
  ErrorCode.FLOW_NOT_FOUND,
  {
    id: FlowId;
  }
>;

export type CollectionNotFoundErrorParams = BaseErrorParams<
  ErrorCode.COLLECTION_NOT_FOUND,
  {
    id: CollectionId;
  }
>;

export type CollectionVersionNotFoundErrorParams = BaseErrorParams<
  ErrorCode.COLLECTION_VERSION_NOT_FOUND,
  {
    id: CollectionVersionId;
  }
>;

export type InstanceNotFoundErrorParams = BaseErrorParams<
  ErrorCode.INSTANCE_NOT_FOUND,
  {
    id?: InstanceId;
    collectionId?: CollectionId;
  }
>;

export type FlowRunNotFoundErrorParams = BaseErrorParams<
  ErrorCode.INSTANCE_NOT_FOUND,
  {
    id: FlowRunId;
  }
>;

export type FlowVersionNotFoundErrorParams = BaseErrorParams<
  ErrorCode.FLOW_VERSION_NOT_FOUND,
  {
    id: FlowVersionId;
  }
>;

export type InvalidCredentialsErrorParams = BaseErrorParams<
  ErrorCode.INVALID_CREDENTIALS,
  {
    email: string;
  }
>;

export type ExistingUserErrorParams = BaseErrorParams<
  ErrorCode.EXISTING_USER,
  {
    email: string;
  }
>;

export type StepNotFoundErrorParams = BaseErrorParams<
  ErrorCode.STEP_NOT_FOUND,
  {
    pieceName: string;
    stepName: string;
  }
>;

export type PieceNotFoundErrorParams = BaseErrorParams<
  ErrorCode.PIECE_NOT_FOUND,
  {
    pieceName: string;
  }
>;

export type PieceTriggerNotFoundErrorParams = BaseErrorParams<
  ErrorCode.PIECE_TRIGGER_NOT_FOUND,
  {
    pieceName: string;
    triggerName: string;
  }
>;

export type ConfigNotFoundErrorParams = BaseErrorParams<
  ErrorCode.CONFIG_NOT_FOUND,
  {
    pieceName: string;
    stepName: string;
    configName: string;
  }
>;

export type JobRemovalFailureErrorParams = BaseErrorParams<
  ErrorCode.JOB_REMOVAL_FAILURE,
  {
    jobId: ApId;
  }
>;

export type SystemPropNotDefinedErrorParams = BaseErrorParams<
  ErrorCode.SYSTEM_PROP_NOT_DEFINED,
  {
    prop: string;
  }
>;

export type SystemInvalidErrorParams = BaseErrorParams<
  ErrorCode.SYSTEM_PROP_INVALID,
  {
    prop: string;
  }
>;

export interface InvalidJwtTokenErrorParams
  extends BaseErrorParams<
    ErrorCode.INVALID_OR_EXPIRED_JWT_TOKEN,
    {
      token: string;
    }
  > { }
export interface FlowRunQuotaExeceededErrorParams
  extends BaseErrorParams<
    ErrorCode.FLOW_RUN_QUOTA_EXCEEDED,
    {}
  > { }

export enum ErrorCode {
  COLLECTION_NOT_FOUND = "COLLECTION_NOT_FOUND",
  COLLECTION_VERSION_NOT_FOUND = "COLLECTION_VERSION_NOT_FOUND",
  CONFIG_NOT_FOUND = "CONFIG_NOT_FOUND",
  EXISTING_USER = "EXISTING_USER",
  APP_CONNECTION_NOT_FOUND = "APP_CONNECTION_NOT_FOUND",
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  FLOW_NOT_FOUND = "FLOW_NOT_FOUND",
  FLOW_RUN_NOT_FOUND = "INSTANCE_NOT_FOUND",
  FLOW_VERSION_NOT_FOUND = "FLOW_VERSION_NOT_FOUND",
  INSTANCE_NOT_FOUND = "INSTANCE_NOT_FOUND",
  INVALID_BEARER_TOKEN = "INVALID_BEARER_TOKEN",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  JOB_REMOVAL_FAILURE = "JOB_REMOVAL_FAILURE",
  PIECE_NOT_FOUND = "PIECE_NOT_FOUND",
  PIECE_TRIGGER_NOT_FOUND = "PIECE_TRIGGER_NOT_FOUND",
  STEP_NOT_FOUND = "STEP_NOT_FOUND",
  SYSTEM_PROP_NOT_DEFINED = "SYSTEM_PROP_NOT_DEFINED",
  INVALID_OR_EXPIRED_JWT_TOKEN = "INVALID_OR_EXPIRED_JWT_TOKEN",
  FLOW_RUN_QUOTA_EXCEEDED = "FLOW_RUN_QUOTA_EXCEEDED",
  SYSTEM_PROP_INVALID = "SYSTEM_PROP_INVALID",
}
