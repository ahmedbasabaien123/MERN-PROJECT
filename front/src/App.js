import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import Routes from "./components/routes";

function App() { 
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      await axios ({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true, 
            })
            .then((res) => { setUid(res.data);
    
    })
    .catch((err) => console.log("No toekn"));
  };
  fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
    <Routes />;
    </UidContext.Provider>
  );
};

export default App;

//token : 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
