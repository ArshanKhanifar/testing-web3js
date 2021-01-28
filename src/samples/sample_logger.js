import Logger from "../utility/logger.js";


const logger = new Logger("sample_logger");

logger.debug("hello", 1, {arhsan: "khanifar"}, true, [1,2,3,4]);
logger.info("hello", 1, {arhsan: "khanifar"}, true, [1,2,3,4]);
logger.warn("hello", 1, {arhsan: "khanifar"}, true, [1,2,3,4]);
logger.error("hello", 1, {arhsan: "khanifar"}, true, [1,2,3,4]);
