import { Cat, Bird, Link, Mail, SquareActivity } from 'lucide-react';
import '../assets/styles/pagefooter.css';
import githubIcon from '../assets/icons/github.png';
import linkedinIcon from '../assets/icons/linkedin.jpg';
import mailLogo from '../assets/icons/mail.webp'

export default function PageFooter() {
  return (
    <div className='page-footer'>
        <div className='left-footer'>
            <SquareActivity />
            © 2026 Tech Pulse INPT. All rights reserved.
        </div>
        <div className='right-footer'>
            <a href='https://github.com/' target='_blank'><img src={githubIcon} className='gitLogo' alt="Github" /></a>
            <a href='https://linkedin.com/' target='_blank'><img src={linkedinIcon}  alt="LinkedIn" /></a>
            <a href='https://email.com/' target='_blank'><img src={mailLogo} alt="Mail" /></a>
        </div>
    </div>
  );
}
