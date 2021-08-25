import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({emails}) {

    return(
        <div className="emails-body">
            <div className="emails-func">

                <div className="func-left">
                    <div>⬜</div>
                    <div>➰</div>
                </div>

                <div className="func-right">
                    <select name="filter" >
                        <option value="name"></option>
                    </select>
                </div>
            </div>


            <div className="emails-list">

                <div className="emails-sort">
                    <div className="sort-selected">
                        <h3>s</h3>
                    </div>
                    <div className="sort-starred">

                    </div>
                    <div className="sort-composer-receiver">

                    </div>

                </div>
                {emails.map(email => <EmailPreview key={email.id} email={email} />)}
            </div>

        </div>
    )
  }
  