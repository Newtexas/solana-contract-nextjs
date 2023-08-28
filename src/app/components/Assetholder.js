export default function Assetholder({ value, setStatus }) {
    const memberStatus = (status) => {
      setStatus(status);
      return status;
    };
  
    const extentionObj = {
        "8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ": true,
        "8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ": true,
        
    };
    const status = memberStatus(extentionObj[value])

    if (status == undefined)
    {
        memberStatus(false)
    }

  }