import {ADDRESSES} from "../addresses.js";
import {moveBalanceInsecure} from "./move_balance_insecure.js";
const account1 = "0x8b782e260a0A8eA4C7F9Ca374D78016ea40C976b";
const account2 = "0xE6a5750eb823bEc8B079Aba0b7bC849D4244C53A";

moveBalanceInsecure(ADDRESSES.ganache, account1, account2, 0.1);

