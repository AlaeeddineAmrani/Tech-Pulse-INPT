import { Search, Cat, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import githubIcon from '../assets/icons/github.png';
import '../assets/styles/pageheader.css';

function PageHeader() {
    const [isDark, setIsDark] = useState(false);
    const [motRecherche, setMotRecherche] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');            
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    function search(){
        if (motRecherche.trim() !== ""){
            let url = `/recherche/${encodeURIComponent(motRecherche)}`;
            navigate(url, { state: { motRecherche } });
        }
    }

    function backHome(){
        navigate(-1)
    }

    return (
        <div className="page-header">
            <div className='left-navbar'>
                <span className="header-title" onClick={() => {backHome()}}>
                    Tech Pulse INPT
                </span>
                <button className='header-btns' onClick={() => navigate('/compare')}>Compare</button>
                <button className='header-btns' onClick={() => {
                    const el = document.getElementById('trending-section');
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        navigate('/');
                        setTimeout(() => {
                            document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                    }
                }}>Trending</button>
                <button className='header-btns'>About Us</button>
            </div>
            
            <div className='right-navbar'>
                <div className="search-bar">
                    <Search className="w-6 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={motRecherche}
                        onChange={(e) => setMotRecherche(e.target.value)}
                        placeholder="Search repositories..."
                        onKeyDown={(e) => {if (e.key === 'Enter'){
                            search()
                        }}}
                    />
                </div>
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={githubIcon} alt="Github" className="gitLogo" />
                </a>
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="header-btns"
                >
                    {isDark ? (
                    <Sun className="w-5 h-5 text-[var(--neon-cyan)]" />
                    ) : (
                    <Moon className="w-5 h-5 text-[var(--neon-purple)]" />
                    )}
                </button>
            </div>
        </div>
    );
} 

export default PageHeader;