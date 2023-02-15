import request from 'app/utils/request';

type ParamCalculatorView = {
  streamingID: string;
  seasonID: string;
  streamingEpisodesID: string;
};
type ParamCalculatorClick = {
  streamingID: string;
  seasonID: string;
  streamingEpisodesID: string;
};

export async function calculatorView(param: ParamCalculatorView) {
  return request(`/web-app/streaming/streaming-episodes/calculator-view`, {
    method: 'GET',
    params: param,
  });
}

export async function calculatorClick(param: ParamCalculatorClick) {
  return request(`/web-app/streaming/streaming-episodes/calculator-click`, {
    method: 'GET',
    params: param,
  });
}
