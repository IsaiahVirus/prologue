import { useState } from 'react';
import Footer  from './components/Footer.js';
import './App.css';
import Rules from './components/Rules.js';
import About from './components/About.js';
import PrevEd from './components/PrevEd.js';
import SubmitForm from './components/SubmitForm.js';
import Header from './components/Header.js';
import EditorLogin from './components/EditorLogin.js'
import EditColumn from './components/EditColumn.js';
import Dashboard from './components/Dashboard.js';

const App = () => {
  
  const [showSubmit, setShowSubmit] = useState (true);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  //most of these functions turn things on or off
  const toggleSubmit = () => {
    setShowSubmit(!showSubmit);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setShowLogin(false); 
  }; 
  const handleLogout = () => {
    setLoggedIn(false);
  };
  
  //fake submissions just to test
const submissions = [ {
    id: 1,  
    author : 'Claude',
    title : 'BlahBlah',
    genre : 'Poetry',
    pathToFile : null,
    editor : 'Isabelle',
    reviewStatus : 'new',
  details : 'blah'},
  {id: 2,
    author : 'Aren',
    title : 'Room 41',
    genre : 'Fiction',
    pathToFile : null,
    editor : 'Joey',
    reviewStatus : 'new',
    details: 'stuff'}]


    // const [submissions, setSubmissions] = useState([]);

    // useEffect(() => {
    //   // Fetch submissions data when the component mounts
    //   fetchSubmissions()
    //     .then(submissionsData => {
    //       setSubmissions(submissionsData);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching submissions:', error);
    //     });
    // }, []);
  

const handleSubmissionSelect = (submission) => {
  setSelectedSubmission(submission);
};

//displays all the components based off if the user is logged in or not
  return (
    <>
    <Header onLoginClick={toggleLogin}
    onLogoutClick={handleLogout}
    loggedIn={loggedIn} />
    {!loggedIn && showLogin && <EditorLogin onClose={closeLogin} onLogin={handleLogin} />}
    {!loggedIn && <Rules toggleSubmit={toggleSubmit} showSubmit={showSubmit}/>}
    {!loggedIn && !showSubmit && <SubmitForm />}
    {!loggedIn && <About />}
    {!loggedIn && <PrevEd />}
    {loggedIn && <EditColumn submissions ={submissions} onSelect={handleSubmissionSelect}/>}
    {loggedIn && selectedSubmission && <Dashboard submission = {selectedSubmission} />}
    <Footer />
    </>
  );
}

export default App;