import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import { getImageURL } from "../../../utils/getImageURL.js";
import LoadingPage from "../../components/common/loading/LoadingPage.jsx";
import LobbyParticipants from "../../components/lobbyParticipants/LobbyParticipants";
import Navbar from "../../components/navbar/Navbar";
import { useGetOneLobby } from "../../hooks/api/lobbies/useGetOneLobby.jsx";
import { useJoinLobby } from "../../hooks/api/lobbies/useJoinLobby.jsx";
import { useLeaveLobby } from "../../hooks/api/lobbies/useLeaveLobby.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import "./lobbyPage.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LobbyPreferences from '../../components/lobbyPreferences/lobbyPreferences';
import LobbyRequirements from "../../components/lobbyRequirements/lobbyRequirements.jsx";
import LobbyDescription from "../../components/lobbyDescription/lobbyDescripton.jsx";
function createData(caption, value) {
  return { caption, value };
}

const getEventDate = (date) => {

  const eventDate = new Date(date);
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth() + 1; // Because months are 0-indexed
  const day = eventDate.getDate();
  const today = new Date();
  const daysFromNow = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

  return { eventDate, untilEvent: `${day}/${month}/${year}`, daysFromNow };
};

export default function LobbyPage() {

 

  const { id } = useParams();
  const { user } = useAuth();
  const { data: lobby, isLoading } = useGetOneLobby(id);
  const { mutate: joinLobby, isPending: isJoining } = useJoinLobby(id);
  const { mutate: leaveLobby, isPending: isLeaving } = useLeaveLobby(id);
  const isOpen=getEventDate(lobby?.start).daysFromNow>0;
  const joined=lobby?.joined?.find((u) => u._id === user._id) 
  console.log(joined, "joined")
console.log(isOpen)
const message="[COMPLETE]";
  const rows = [
    createData('Hosted by', lobby?.owner.username),
    createData('Campsite', lobby?.campsite.name),
    createData('Status', lobby?.open?"Open":"Closed"),
    createData('Start Date', lobby?.start),
    createData('End Date', lobby?.end,),

];
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <div className="lobby-page">
        <div className="lobby-page-container">
          <div className="lobby-header">
          <h1>{isOpen ? lobby.name : `${lobby.name} ${message}`}</h1>
          </div>
          <div className="lobby-details-card">
            <div className="lobby-details-container">
              <div className="lobby-image">
                <img src={getImageURL(lobby.campsite.mainImg)} alt="" />
              </div>

              <div className="lobby-details-container-right">
              <TableContainer sx={{ mt: 4, border: '2px solid #AD5D5D', borderRadius: '5px' }} component={Paper}>
                <Table sx={{ minWidth: 500, }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                           
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => (
                            <TableRow
                                key={row.caption}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index === 0 && < PersonIcon sx={{ mb: -1, mr: 2 }} />}
                                    {index === 1 && <LocationOnIcon sx={{ mb: -1, mr: 2 }} />} {/* Replace with actual icons */}
                                    {index === 2 && <AutorenewIcon sx={{ mb: -1, mr: 2 }} />} {/* Replace with actual icons */}
                                    {index === 3 && <EventIcon sx={{ mb: -1, mr: 2 }} />} {/* Replace with actual icons */}
                                    {index === 4 && <EventIcon sx={{ mb: -1, mr: 2 }} />} {/* Replace with actual icons */}
                                    {row.caption}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <div className="days-from-now-container">
                  <div></div>
                  <div>
                  <p className="days-from-now" style={{textAlign:'left'}}>
                    {getEventDate(lobby.start).daysFromNow +
                      ` Days from Now`}
                  </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lobby-preferences">
              <div className="preferences-header" >
                <h1 > Lobby Description:</h1>
                </div>
                <LobbyDescription
                description={lobby.desc}/>
                </div>
            <div className="lobby-preferences">
              <div className="preferences-header">
                <h1> Lobby Preferences:</h1>
              </div>
              <LobbyPreferences
              
              age={lobby.age}
              ambiance={lobby.ambiance}
              experience={lobby.experience}
              gender={lobby.gender}
              kid={lobby.kid ? "Yes" : "No"}
              pet={lobby.pet ? "Yes" : "No"}
              />
                            
            </div>

            <div className="lobby-preferences">
              <div className="preferences-header" >
                <h1 > Lobby Requirements:</h1>
              </div>
               <LobbyRequirements
               food={lobby.food ? "Included" : "Bring your own"}
               equipmentNeeded={lobby.equipmentNeeded}
               equipmentProvided={lobby.equipmentProvided}
               transport={lobby.transport ? "Provided" : "Not Provided"}/>         
              
              
            </div>
          </div>
        </div>

        <div className="lobby-page-right">
          <div>
            {!lobby.joined.find((u) => u._id === user._id) ? (
              <button
                className="join-btn"
                disabled={isJoining||!isOpen}
                onClick={() => joinLobby()}
              >
                <AddIcon className="leave-icon" />
                Join Trip
              </button>
            ) : (
              <button
                className="leave-btn"
                disabled={isLeaving||!isOpen}
                onClick={() => leaveLobby()}
              >
                <ExitToAppIcon className="leave-icon" />
                Leave Trip
              </button>
            )}
          </div>
          <LobbyParticipants participants={lobby.joined} isOpen={isOpen}
          joined={joined}
 host={lobby.owner} />
        </div>
      </div>
    </>
  );
}
