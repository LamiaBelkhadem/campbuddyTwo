import React, {useContext, useEffect, useRef, useState} from 'react';
import './createLobby.css';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import {useNavigate} from "react-router";
import {ContextAuth} from "../../context/ContextAuth";
import {login} from "../../apis";
import Modal from "bootstrap/js/dist/modal";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import WcIcon from '@mui/icons-material/Wc';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PetsIcon from '@mui/icons-material/Pets';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AdjustIcon from '@mui/icons-material/Adjust';
import ExplicitIcon from '@mui/icons-material/Explicit';
import TitleIcon from '@mui/icons-material/Title';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
export default function CreateLobby() {
    const {user} = useContext(ContextAuth);
    const host=user._id;
    console.log(user._id);
    const [name, setTitle] = useState('');
    const [start, setStartDate] = useState('');
    const [end, setEndDate] = useState('');
    const [time, setTime] = useState('');
    const [maximumParticipants, setMaxParticipants] = useState('');
    const [campsite, setSelectedCampsite] = useState('');
    const [desc, setDescription] = useState('');
    const [age, setAgeGroup] = useState('');
    const [experience, setExperience] = useState('');
    const [gender, setGender] = useState('');
    const [kids, setIsKidFriendly] = useState('');
    const [pets, setIsPetFriendly] = useState('');
    const [ambiance, setAmbiance] = useState('');
    const [food, setFoodOption] = useState('');
    const [transport, setTransportOption] = useState('');
    const PF = process.env.REACT_APP_COMMON_FOLDER;
    const navigate = useNavigate();
    const modalRef = useRef(null); // Ref for the modal element
    const [bootstrapModal, setBootstrapModal] = useState(null);

    const [equipmentNeeded, setEquipmentNeeded] = useState(new Set());
    const [equipmentProvided, setEquipmentProvided] = useState(new Set());

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const dropdownRef1 = useRef();

    const handleEquipmentNeededChange = (item) => {
        setEquipmentNeeded((prevEquipment) => {
            const newEquipment = new Set(prevEquipment);
            if (newEquipment.has(item)) {
                newEquipment.delete(item);
            } else {
                newEquipment.add(item);
            }
            return newEquipment;
        });
    };

    useEffect(() => {
        // Check if modalRef.current is not null before trying to create a new Modal instance
        if (modalRef.current) {
            const bsModal = new Modal(modalRef.current);
            setBootstrapModal(bsModal);
        }
    }, []);

    useEffect(() => {
        console.log(user);
      }, [user]);


     
    
    const handleClose = () => {
        bootstrapModal.hide();
        navigate("/");
    };


    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };


    const handleParticipantsChange = (e) => {
        setMaxParticipants(Number(e.target.value));
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    const handleAgeGroupChange = (e) => {
        setAgeGroup(e.target.value);
    };

    const handleExperienceChange = (e) => {
        setExperience(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleFoodOptionChange = (e) => {
        if (e.target.value === 'yes') {
            setFoodOption(true);
        } else {
            setFoodOption(false);
        }
    };

    const handleTransportOptionChange = (e) => {
        if (e.target.value === 'yes') {
            setTransportOption(true);
        } else {
            setTransportOption(false);
        }
    };
    const handleCampsiteOptionChange = (e) => {
        setSelectedCampsite(e.target.value);
    };
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleEquipmentProvidedChange = (item) => {
        setEquipmentProvided((prevEquipment) => {
            const newEquipment = new Set(prevEquipment);
            if (newEquipment.has(item)) {
                newEquipment.delete(item);
            } else {
                newEquipment.add(item);
            }
            return newEquipment;
        });
    };
    const handlePetFriendlyChange = (e) => {
        if (e.target.value === 'no') {
            setIsPetFriendly(false);
        } else {
            setIsPetFriendly(true);
        }
    };
    const handleKidFriendlyChange = (e) => {
        if (e.target.value === 'yes') {
            setIsKidFriendly(true);
        } else {
            setIsKidFriendly(false);
        }
    };
    const handleAmbianceChange = (e) => {
        setAmbiance(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("lobby info", kids)
        // Construct the lobby object with all the form inputs and selected equipment
        const lobbyData = {
            host,
            name,
            start,
            end,
            time,
            maximumParticipants,
            campsite: campsite,
            desc,
            age,
            experience,
            gender,
            kids,
            pets,
            ambiance,
            food,
            transport,
            equipmentNeeded: Array.from(equipmentNeeded),
            equipmentProvided: Array.from(equipmentProvided),
        };

        console.log("user is", host);
        try {
            const response = await axios.post('http://localhost:8080/api/lobbies', lobbyData);
        console.log(response.data);
        if (bootstrapModal) {
            bootstrapModal.show(); 
        }
           
        } catch (error) {
            console.error('Error creating lobby:', error);
            // Handle errors, e.g., show an error message
        }
        console.log(lobbyData);
    };
    const equipmentList = [
        'Tent',
        'Utensils',
        'Sleeping Bag',
        'Camp Stove',
        'First Aid Kit',
        'Flashlight',
        'Portable Charger',
        'Maps and Compass',
        'Water Bottle',
        'Fire Starter',
    ];
    const toggleDropdown = () => setIsOpen(!isOpen);
    const toggleDropdown1 = () => setIsOpen1(!isOpen1);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    useEffect(() => {
        const handleClickOutside1 = (event) => {
            if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
                setIsOpen1(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside1);
        return () => document.removeEventListener('mousedown', handleClickOutside1);
    }, [dropdownRef1]);


    const [campsites, setCampsites] = useState([]);

    useEffect(() => {
        const fetchCampsites = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/campsites'); //
                setCampsites(response.data);
                console.log(response.data)// Assuming the response data is the array of campsites
            } catch (error) {
                console.error('Error fetching campsites:', error);
            }
        };

        fetchCampsites();
    }, []);


    return (
        <div className="create-lobby-page">
            <Navbar/>
            <div className="create-lobby-container">
                <div className="create-lobby-box">
                    <form>
                        <h2 className="title1"><Diversity2TwoToneIcon className="create-lobby-icon"/>Create a New Lobby
                        </h2>
                        <div className="username1"></div>
                        <div className="desc">Create your lobby and add your preferences.
                        </div>
                        <h5>Lobby Details:</h5>
                        <div className="input-lobby-icon">
                            <TitleIcon className="icon"/>
                            <input
                                className="input-lobby-box"
                                type="text"
                                placeholder="Lobby Title"
                                value={name}
                                onChange={(e) => setTitle(e.target.value)}
                            /></div>
                        <div className="box1">
                            <div className="input-lobby-icon">
                                <DateRangeIcon className="icon"/>
                                <input className="input-lobby-box" type="date" placeholder="Start Date"
                                       value={start}
                                       onChange={handleStartDateChange}/>
                            </div>
                            <div className="input-lobby-icon">
                                <DateRangeIcon className="icon"/>
                                <input className="input-lobby-box" type="time" value={time}
                                       onChange={handleTimeChange} placeholder="Time"/>
                            </div>
                            <div className="input-lobby-icon">
                                <DateRangeIcon className="icon"/>
                                <input className="input-lobby-box" type="date" placeholder="End Date" value={end}
                                       onChange={handleEndDateChange}/>
                            </div>

                        </div>
                        <div className="input-lobby-icon">
                            <PeopleAltIcon className="icon"/>
                            <input className="input-lobby-box" type="number"
                                   placeholder="Maximum number of Participants"
                                   value={maximumParticipants}
                                   onChange={handleParticipantsChange}/>
                        </div>
                        <div className="input-lobby-icon">
                            <LocationOnIcon className="icon"/>
                            <select className="input-lobby-box"
                                    onChange={handleCampsiteOptionChange}
                                    value={campsite}>
                                <option value="" disabled selected>Campsite</option>
                                {campsites.map((campsite) => (
                                    <option key={campsite.id} value={campsite.id}>{campsite.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="textarea-container">
                    <textarea
                        rows="4"
                        cols="50"
                        onChange={handleDescriptionChange}
                        value={desc}
                        placeholder="Describe the camping trip. You can describe the campsite, suggest activities or share the weather forecast of the trip days."
                    ></textarea>
                        </div>
                        <div className="separator-container">
                            <div className="separator"/>
                        </div>
                        <h5>Lobby Preferences:</h5>


                        <div className="input-lobby-icon">
                            <AdjustIcon className="icon"/>
                            <select
                                className="input-lobby-box"
                                value={age}
                                onChange={handleAgeGroupChange}
                            >
                                <option value="" disabled>Select Age Group</option>
                                <option value="Young Adults">Young Adults</option>
                                <option value="Adults">Adults</option>
                                <option value="Seniors">Seniors</option>
                                <option value="All">All</option>

                            </select>
                        </div>
                        <div className="input-lobby-icon">
                            <ExplicitIcon className="icon"/>
                            <select
                                className="input-lobby-box"
                                value={experience}
                                onChange={handleExperienceChange}
                            >
                                <option value="" disabled>Select Experience</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="input-lobby-icon">
                            <WcIcon className="icon"/>
                            <div className="input-lobby-box-radio">
                                <div className="input-label">Gender:</div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="male-only"
                                        name="gender"
                                        value="Male-Only"
                                        checked={gender === 'Male-Only'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="male-only">Male-Only</label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="female-only"
                                        name="gender"
                                        value="Female-Only"
                                        checked={gender === 'Female-Only'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="female-only">Female-Only</label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="all"
                                        name="gender"
                                        value="All"
                                        checked={gender === 'All'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="all">All</label>
                                </div>
                            </div>
                        </div>

                        <div className="input-lobby-icon">
                            <ChildCareIcon className="icon"/>
                            <div className="input-lobby-box-radio">
                                <div className="input-label">Kid-Friendly:</div>
                                <div className="radio-option">
                                    <input type="radio" id="kid-yes" name="kid" value="yes"
                                           onChange={handleKidFriendlyChange}/>
                                    <label htmlFor="yes">No</label>
                                </div>
                                <div className="radio-option">
                                    <input type="radio" id="kid-no" name="kid" value="no"
                                           onChange={handleKidFriendlyChange}/>
                                    <label htmlFor="yes">Yes</label>
                                </div>
                            </div>
                        </div>
                        <div className="input-lobby-icon">
                            <PetsIcon className="icon"/>
                            <div className="input-lobby-box-radio">
                                <div className="input-label">Pet-Friendly:</div>
                                <div className="radio-option">
                                    <input type="radio" id="pet-no" name="pet" value="no"
                                           onChange={handlePetFriendlyChange}/>

                                    <label htmlFor="no">No</label>
                                </div>
                                <div className="radio-option">
                                    <input type="radio" id="pet-yes" name="pet" value="yes"
                                           onChange={handlePetFriendlyChange}/> <label htmlFor="yes">Yes</label>
                                </div>
                            </div>
                        </div>
                        <div className="input-lobby-icon">
                            <EmailIcon className="icon"/>
                            <select className="input-lobby-box"
                                    value={ambiance}
                                    onChange={handleAmbianceChange}>
                                <option value="" disabled selected>Ambiance</option>
                                <option value="relaxed">Relaxed</option>
                                <option value="adventurous">Adventurous</option>
                                <option value="family-friendly">Family-Friendly</option>
                                <option value="party">Party</option>
                                <option value="quiet">Quiet</option>
                                <option value="nature-immersive">Nature-Immersive</option>
                                <option value="luxurious">Luxurious</option>
                                <option value="rustic">Rustic</option>
                                <option value="spiritual">Spiritual</option>
                            </select>
                        </div>
                        <div className="separator-container">
                            <div className="separator"/>
                        </div>
                        <h5>Lobby Requirements:</h5>
                        <div className="input-lobby-icon">
                            <FastfoodIcon className="icon"/>
                            <div className="input-lobby-box-radio">
                                <div className="input-label">Food and Drinks:</div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="food-required"
                                        name="food"
                                        value="required"
                                        onChange={handleFoodOptionChange}
                                    />
                                    <label htmlFor="food-required">Required</label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="food-provided"
                                        name="food"
                                        value="provided"
                                        onChange={handleFoodOptionChange}
                                    />
                                    <label htmlFor="food-provided">Provided</label>
                                </div>
                            </div>
                        </div>

                        <div className="input-lobby-icon">
                            <DirectionsBusIcon className="icon"/>
                            <div className="input-lobby-box-radio">
                                <div className="input-label">Transportation:</div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="transport-not-provided"
                                        name="transport"
                                        value="not-provided"
                                        onChange={handleTransportOptionChange}
                                    />
                                    <label htmlFor="transport-not-provided">Not provided</label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="transport-provided"
                                        name="transport"
                                        value="provided"
                                        onChange={handleTransportOptionChange}
                                    />
                                    <label htmlFor="transport-provided">Provided</label>
                                </div>
                            </div>
                        </div>
                       

                        <div className="equipments">
                            <div className="dropdown-container" ref={dropdownRef}>
                                <button type="button" onClick={toggleDropdown} className="dropdown-button">
                                    <HomeRepairServiceIcon className="icon-equipment"/>
                                    Equipment Needed <ArrowDropDownIcon/>
                                </button>

                                {isOpen && (
                                    <div className="dropdown-list">
                                        {equipmentList.map((item, index) => (
                                            <label key={index} className="dropdown-list-item">
                                                <input
                                                    type="checkbox"
                                                    checked={equipmentNeeded.has(item)}
                                                    onChange={() => handleEquipmentNeededChange(item)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                {item}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="dropdown-container" ref={dropdownRef1}>
                                <button type="button" onClick={toggleDropdown1} className="dropdown-button">
                                    <HomeRepairServiceIcon className="icon-equipment"/>
                                    Equipment Provided <ArrowDropDownIcon/>
                                </button>

                                {isOpen1 && (
                                    <div className="dropdown-list">
                                        {equipmentList.map((item, index) => (
                                            <label key={index} className="dropdown-list-item">
                                                <input
                                                    type="checkbox"
                                                    checked={equipmentProvided.has(item)}
                                                    onChange={() => handleEquipmentProvidedChange(item)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                {item}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className="submit-lobby-btn" onClick={handleSubmit} type="submit">Create Lobby</button>
                    </form>
                    <div className="or-section">Changed your Mind?</div>
                    <div className="skip-container">
                        <button className="skip-btn">Cancel</button>
                    </div>
                </div>
                <div className="modal fade" ref={modalRef} tabIndex="-1" id="lobbyCreationConfirmModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Lobby Created!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}
                                ></button>
                            </div>
                            <div className="modal-body">
                               You have successfully created a new lobby. Other campers can now see it and request to join.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}
                                >Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
        ;
}


