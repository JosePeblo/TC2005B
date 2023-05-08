CREATE TRIGGER `entreganLog` 
AFTER INSERT ON `entregan` 
FOR EACH ROW 
    INSERT INTO `entreganLog` (`timestamp`) VALUES 
    (current_timestamp());