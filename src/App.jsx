
import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import JurnalPage from './pages/jurnal/JurnalPage';
import JurnalDetailPage from './pages/jurnalDetail/JurnalDetailPage';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import Comments from './pages/admin/screens/comments/Comments';
import Ranks from './pages/admin/screens/ranks/Ranks';
import EditRanks from './pages/admin/screens/ranks/EditRanks';
import Tracks from './pages/admin/screens/tracks/Tracks';
import EditTracks from './pages/admin/screens/tracks/EditTracks';
import ManageJurnals from './pages/admin/screens/jurnals/ManageJurnals';
import EditJurnal from './pages/admin/screens/jurnals/EditJurnal';
import ColumnStyles from './pages/admin/screens/columnstyles/ColumnStyles';
import EditColumnStyles from './pages/admin/screens/columnstyles/EditColumnStyles';
import Countries from './pages/admin/screens/countries/Countries';
import EditCountries from './pages/admin/screens/countries/EditCountries';
import Currencies from './pages/admin/screens/currencies/Currencies';
import EditCurrencies from './pages/admin/screens/currencies/EditCurrencies';
import Institutions from './pages/admin/screens/institutions/Institutions';
import EditInstitutions from './pages/admin/screens/institutions/EditInstitutions';
import Languages from './pages/admin/screens/languages/Languages';
import EditLanguages from './pages/admin/screens/languages/EditLanguages';
import PublishPeriods from './pages/admin/screens/publishperiods/PublishPeriods';
import EditPublishPeriods from './pages/admin/screens/publishperiods/EditPublishPeriods';
import Users from './pages/admin/screens/users/Users';
import CountryPage from './pages/country/CountryPage';
import InstitutionPage from './pages/institution/InstitutionPage';
import LanguagePage from './pages/language/LanguagePage';

function App() {
    useEffect(function () {
        Aos.init({ duration: 2000 });
    }, []);
    return (
        <div className='App font-opensans'>
            <Routes>
                <Route index path='/' element={<HomePage />} />
                <Route index path='/register' element={<RegisterPage />} />
                <Route index path='/login' element={<LoginPage />} />
                <Route index path='/profile' element={<ProfilePage />} />
                <Route index path='/countriesall' element={<CountryPage />} />
                <Route index path='/institutionsall' element={<InstitutionPage />} />
                <Route index path='/languagesall' element={<LanguagePage />} />
                <Route index path='/jurnalall' element={<JurnalPage />} />
                <Route path='/jurnalall/:slug' element={<JurnalDetailPage />} />
                <Route path='/admin' element={<AdminLayout />}>
                    <Route index element={<Admin />} />
                    <Route path='comments' element={<Comments />} />
                    <Route path='ranks/manage' element={<Ranks />} />
                    <Route path='ranks/manage/edit/:slug' element={<EditRanks />} />
                    <Route path='tracks/manage' element={<Tracks />} />
                    <Route path='tracks/manage/edit/:slug' element={<EditTracks />} />
                    <Route path='columnstyles/manage' element={<ColumnStyles />} />
                    <Route path='columnstyles/manage/edit/:slug' element={<EditColumnStyles />} />
                    <Route path='countries/manage' element={<Countries />} />
                    <Route path='countries/manage/edit/:slug' element={<EditCountries />} />
                    <Route path='currencies/manage' element={<Currencies />} />
                    <Route path='currencies/manage/edit/:slug' element={<EditCurrencies />} />
                    <Route path='institutions/manage' element={<Institutions />} />
                    <Route path='institutions/manage/edit/:slug' element={<EditInstitutions />} />
                    <Route path='languages/manage' element={<Languages />} />
                    <Route path='languages/manage/edit/:slug' element={<EditLanguages />} />
                    <Route path='publishperiods/manage' element={<PublishPeriods />} />
                    <Route path='publishperiods/manage/edit/:slug' element={<EditPublishPeriods />} />
                    <Route path='jurnals/manage' element={<ManageJurnals />} />
                    <Route path='jurnals/manage/edit/:slug' element={<EditJurnal />} />
                    <Route path="users/manage" element={<Users />} />
                </Route>
            </Routes>
            <Toaster />
        </div>
    )
}

export default App