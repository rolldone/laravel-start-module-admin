import PositionService, { PositionInterface, PositionServiceInterface } from "src/services/PositionService";

const GetPositions = async (props: PositionServiceInterface) => {
  try {
    let resDatas = await PositionService.gets(props);
    return resDatas;
  } catch (ex) {
    throw ex;
  }
}

export default GetPositions;