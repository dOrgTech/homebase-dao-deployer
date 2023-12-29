import BigNumber from "bignumber.js"
import { Network } from "services/beacon"

interface TokenParams {
  id: string
  contract: string
  token_id: number
  symbol: string
  name: string
  decimals: number
  network: Network
  supply: string
  standard: string
}

export class Token {
  id: string
  contract: string
  token_id: number
  symbol: string
  name: string
  decimals: number
  network: Network
  supply: BigNumber
  standard: string

  constructor(params: TokenParams) {
    this.id = params.id
    this.contract = params.contract
    this.token_id = params.token_id
    this.symbol = params.symbol
    this.name = params.name
    this.decimals = params.decimals
    this.network = params.network
    this.supply = new BigNumber(params.supply)
    this.standard = params.standard ? params.standard : ""
  }
}

export type OrgSettings = {
  name: string
  symbol: string
  description: string
  administrator: string
  guardian: string
  governanceToken: {
    address: string
    tokenId: string
    tokenMetadata?: Token
  }
}

export type QuorumSettings = {
  quorumThreshold: number
  minQuorumAmount: number
  maxQuorumAmount: number
  quorumChange: number
  quorumMaxChange: number
}

export type VotingSettings = {
  proposeStakeRequired: string
  returnedTokenPercentage: number
  minXtzAmount: number
  maxXtzAmount: number

  votingBlocks: number
  proposalFlushBlocks: number
  proposalExpiryBlocks: number

  votingBlocksDay?: number
  votingBlocksHours?: number
  votingBlocksMinutes?: number

  proposalFlushBlocksDay?: number
  proposalFlushBlocksHours?: number
  proposalFlushBlocksMinutes?: number

  proposalExpiryBlocksDay?: number
  proposalExpiryBlocksHours?: number
  proposalExpiryBlocksMinutes?: number
}

export interface MigrationParams {
  template: DAOTemplate
  orgSettings: OrgSettings
  votingSettings: VotingSettings
  quorumSettings: QuorumSettings
}

export type Settings = OrgSettings | VotingSettings | QuorumSettings

export type ErrorValues<T> = Partial<Record<keyof T, string>>

export interface NavigationBarProps {
  back?: {
    text: string
    handler: () => void
  }
  next?: {
    text: string
    handler: () => void
  }
}

export type DAOTemplate = "lambda" | "lite" | ""

export type DeploymentMethod = "managed" | "self-deployed"

type DeploymentStatus = {
  deploying: boolean
  successful: boolean
  contract?: string
}

export type CreatorState = {
  data: MigrationParams
  deploymentStatus: DeploymentStatus
} & NavigationBarProps

export enum StepperIndex {
  SELECT_TEMPLATE,
  CONFIGURE_TEMPLATE,
  REVIEW_INFORMATION,
  LAUNCH_ORGANIZATION
}

export interface StepInfo {
  title: string
  index: number
  path: string
}

function updateNavigationBar(props: NavigationBarProps) {
  return <const>{
    type: ActionTypes.UPDATE_NAVIGATION_BAR,
    ...props
  }
}

function updateOrgSettings(org: OrgSettings) {
  return <const>{
    type: ActionTypes.UPDATE_ORGANIZATION_SETTINGS,
    org
  }
}

function updateVotingSettings(voting: VotingSettings) {
  return <const>{
    type: ActionTypes.UPDATE_VOTING_SETTINGS,
    voting
  }
}

function updateTemplate(template: DAOTemplate) {
  return <const>{
    type: ActionTypes.UPDATE_TEMPLATE,
    template
  }
}

function updateQuorumSettings(quorum: QuorumSettings) {
  return <const>{
    type: ActionTypes.UPDATE_QUORUM_SETTINGS,
    quorum
  }
}

function updateDeploymentStatus({ deploying, contract }: DeploymentStatus) {
  return <const>{
    type: ActionTypes.UPDATE_DEPLOYMENT_STATUS,
    status: { deploying, contract }
  }
}

function clearCache() {
  return <const>{
    type: ActionTypes.CLEAR_CACHE
  }
}

export type CreatorAction = ReturnType<
  | typeof updateNavigationBar
  | typeof updateOrgSettings
  | typeof updateVotingSettings
  | typeof updateQuorumSettings
  | typeof updateDeploymentStatus
  | typeof clearCache
  | typeof updateTemplate
>

export enum ActionTypes {
  UPDATE_NAVIGATION_BAR = "UPDATE_NAVIGATION_BAR",
  UPDATE_VOTING_SETTINGS = "UPDATE_VOTING_SETTINGS",
  UPDATE_TEMPLATE = "UPDATE_TEMPLATE",
  UPDATE_QUORUM_SETTINGS = "UPDATE_QUORUM_SETTINGS",
  UPDATE_ORGANIZATION_SETTINGS = "UPDATE_ORGANIZATION_SETTINGS",
  UPDATE_DEPLOYMENT_STATUS = "UPDATE_DEPLOYMENT_STATUS",
  CLEAR_CACHE = "CLEAR_CACHE"
}
export interface TokenHolder {
  address: string
  balance: number
  name?: string
}
