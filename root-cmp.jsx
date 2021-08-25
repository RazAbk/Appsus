
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { Home } from './js/pages/Home.jsx'
import { About } from './js/pages/About.jsx';
import { Email } from './js/pages/Email.jsx';
import { Notes } from './js/pages/Notes.jsx';
import { Books } from './js/pages/Books.jsx';
import { AppHeader } from './js/cmps/AppHeader.jsx';
import { AppFooter } from './js/cmps/AppFooter.jsx';

export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main>
                <Switch>
                    <Route exact path="/Books" component={Books} />
                    <Route exact path="/Notes" component={Notes} />
                    <Route exact path="/Email" component={Email} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </main>
            <footer>
                <AppFooter />
            </footer>
        </Router>

    )
    
}

