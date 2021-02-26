import { useHistory} from "react-router";



      const Logout = () => {
          const history = useHistory();
        localStorage.clear();
          window.location.reload();
          history.push({
              pathname:  "/"

          });

           };






export default Logout;

