// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import User from './User';
import { UserProvider } from './UserContext';
import Profile from './Profile';
import AdminUsers from './adminUsers';
import AddNewUser from './AddNewUser';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';
import ChooseTeam from './ChooseTeam';
import AdminTeam from './adminTeam';
import AddNewTeam from './AddNewTeam';
import DeleteTeam from './DeleteTeam';
import UpdateTeam from './UpdateTeam';
import ChooseTopic from './ChooseTopic';
import AdminProject from './adminProject';
import AddNewProject from './AddNewProject';
import DeleteProject from './DeleteProject';
import ProjectStatus from './ProjectStatus';
import UploadDocuments from './UploadDocuments';
import AddSynopsis from './AddSynopsis';
import AddDesign from './AddDesign';
import AddCodephase1 from './AddCodephase1';
import AddCodephase2 from './AddCodephase2';
import AddReport from './AddReport';
import AdminMarks from './adminMarks';
import AddNewMark from './AddNewMark';
import DeleteMark from './DeleteMark';
import UploadMarks from './UploadMarks';
import AddSynopsisMark from './AddSynopsisMark';
import AddDesignMark from './AddDesignMark';
import AddFirstMark from './AddFirstMark';
import AddFiftyMark from './AddFiftyMark';
import AddSecondMark from './AddSecondMark';
import AddHundredMark from './AddHundredMark';
import AddFinalMark from './AddFinalMark';
import AddReportMark from './AddReportMark';
import GuideMeeting from './GuideMeeting';
import Marks from './Marks';
import TeacherMarks from './TeacherMarks';
import TeacherUsers from './TeacherUsers';
import TeacherAddNewUser from './TeacherAddNewUser';
import TeacherDeleteUser from './TeacherDeleteUser';
import TeacherUpdateUser from './TeacherUpdateUser';
import AdminDepartment from './adminDepartment';
import AddNewDepartment from './AddNewDepartment';
import DeleteDepartment from './DeleteDepartment';
import AdminStage from './adminStage';
import AddNewStage from './AddNewStage';
import DeleteStage from './DeleteStage';
import AdminProjectStage from './adminProjectStage';
import AddNewProjectStage from './AddNewProjectStage';
import DeleteProjectStage from './DeleteProjectStage';
import StageDetails from './StageDetails';
import MarkDetails from './MarkDetails';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{
            headerTitle: () => <Header />,
            headerStyle: {
              backgroundColor: '#3734A9',
              height: 120,
            }
          }} component={Home} />
        <Stack.Screen name="login"
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={Login} />
        <Stack.Screen name="signup"
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={Signup} />
         <Stack.Screen name="user"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={User} />
           <Stack.Screen name="profile"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={Profile} />
         <Stack.Screen name="adminusers"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AdminUsers} />
         <Stack.Screen name="addnewuser"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddNewUser} />
        <Stack.Screen name="deleteuser"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={DeleteUser} />
         <Stack.Screen name="updateuser"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={UpdateUser} />
         <Stack.Screen name="chooseteam"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={ChooseTeam} />
              <Stack.Screen name="adminteam"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AdminTeam} />
        <Stack.Screen name="addnewteam"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddNewTeam} />
         <Stack.Screen name="deleteteam"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={DeleteTeam} />
         <Stack.Screen name="updateteam"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={UpdateTeam} />
         <Stack.Screen name="choosetopic"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={ChooseTopic} />
         <Stack.Screen name="adminproject"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AdminProject} />
          <Stack.Screen name="addnewproject"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddNewProject} />
           <Stack.Screen name="deleteproject"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={DeleteProject} />
             <Stack.Screen name="projectstatus"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={ProjectStatus} />
           <Stack.Screen name="uploaddocuments"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={UploadDocuments} />
                  <Stack.Screen name="addsynopsis"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddSynopsis} />
                    <Stack.Screen name="adddesign"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddDesign} />
         <Stack.Screen name="addcodephase1"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddCodephase1} />
             <Stack.Screen name="addcodephase2"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddCodephase2} />
             <Stack.Screen name="addreport"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddReport} />
             <Stack.Screen name="adminmarks"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AdminMarks} />
            <Stack.Screen name="addnewmark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddNewMark} />
            <Stack.Screen name="deletemark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={DeleteMark} />
              <Stack.Screen name="uploadmarks"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={UploadMarks} />
            <Stack.Screen name="addsynopsismark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddSynopsisMark} />
             <Stack.Screen name="adddesignmark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddDesignMark} />
             <Stack.Screen name="addfirstmark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddFirstMark} />
             <Stack.Screen name="addfiftymark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddFiftyMark} />
             <Stack.Screen name="addsecondmark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddSecondMark} />
             <Stack.Screen name="addhundredmark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddHundredMark} />
             <Stack.Screen name="addfinalmark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddFinalMark} />
             <Stack.Screen name="addreportmark"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddReportMark} />
                     <Stack.Screen name="guidemeeting"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={GuideMeeting} />
         <Stack.Screen name="marks"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={Marks} />
            <Stack.Screen name="teachermarks"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={TeacherMarks} />
               <Stack.Screen name="teacherusers"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={TeacherUsers} />
            <Stack.Screen name="teacheraddnewuser"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={TeacherAddNewUser} />
              <Stack.Screen name="teacherdeleteuser"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={TeacherDeleteUser} />
               <Stack.Screen name="teacherupdateuser"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={TeacherUpdateUser} />
              <Stack.Screen name="admindepartment"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AdminDepartment} />
             <Stack.Screen name="addnewdepartment"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddNewDepartment} />
             <Stack.Screen name="deletedepartment"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={DeleteDepartment} />
               <Stack.Screen name="adminstage"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AdminStage} />
        <Stack.Screen name="addnewstage"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddNewStage} />
        <Stack.Screen name="deletestage"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={DeleteStage} />
              <Stack.Screen name="adminprojectstage"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AdminProjectStage} />
             <Stack.Screen name="addnewprojectstage"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={AddNewProjectStage} />
          <Stack.Screen name="deleteprojectstage"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={DeleteProjectStage} />
            <Stack.Screen name="StageDetails"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={StageDetails} />
                    <Stack.Screen name="MarkDetails"
        options={{
          headerTitle: () => <Header name='1' />,
          headerStyle: {
            backgroundColor: '#3734A9',
            height: 120,
          }
        }} component={MarkDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

export default App;