
export function EmailPreview({email}) {

    return(
        <div className="email-preview">
            <div className="email-left">
                <div>⬜</div>
                <div>🟡</div>
                <p>{email.composer}</p>
            </div>
            <div className="email-right">
                <p>{email.subject}</p>
                <p>{email.sentAt}</p>
                <div>⬜</div>
                <div>🟡</div>
            </div>
        </div>
    )
  }
  