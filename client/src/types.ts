export interface Metrics {
  userCount: number;
  amountLeveraged: number;
}
export interface leveragePosition  {
    id:number,
    owner:String,
    collateralToken:String,
    loanToken:String,
    amountCollateral:number,
    open:boolean  
}