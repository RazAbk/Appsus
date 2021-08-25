
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { Home } from './js/pages/Home.jsx'
import { About } from './js/pages/About.jsx';
import { EmailApp } from './js/apps/email/pages/EmailApp.jsx'
import { NotesApp } from './js/apps/keep/pages/NotesApp.jsx';
import { BooksApp } from './js/apps/book/pages/BooksApp.jsx';
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
                    <Route path="/books" component={BooksApp} />
                    <Route path="/notes" component={NotesApp} />
                    <Route path="/email" component={EmailApp} />
                    <Route path="/about" component={About} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </main>
            <footer>
                <AppFooter />
            </footer>
        </Router>

    )
    
}

