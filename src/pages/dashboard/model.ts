// 接口返回数据
export interface IDashboardResult {
  game_data: object[];
  items: {
    hash: object[];
    legend: Record<string, string>;
  };
  rows: {
    cost: object;
    pay: object;
    reg: object;
  }
}
