// 搜索模态框外部调用方法
export interface IGlobalSearchModal {
  toggle: () => void;
}

// 搜索结果
export interface IGlobalSearchResult {
  title: string;
  key: string;
  index: number;
}
