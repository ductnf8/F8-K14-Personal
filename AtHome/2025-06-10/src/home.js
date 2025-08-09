import {isAuthenticated} from './services/authService.js';
import {renderHomePage} from './pages/homePage.js';

if (!isAuthenticated()) {
    window.location.href = '/index.html';
} else {
    renderHomePage();
}
