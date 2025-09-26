export default function About() {
  return (
    <div style={{ fontFamily: 'var(--font-inter)' }} className="m-5">
      <h1 className="text-2xl">About</h1>
      <p>
        This is the educational movie search application that uses API from{' '}
        <a style={{ textDecoration: 'underline', color: 'blue' }} href="https://www.themoviedb.org/">
          The Movie Database
        </a>{' '}
        (TMDB).
      </p>
      <br />

      <a className="inline-block" href="https://www.themoviedb.org/">
        <img
          src="/images/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="TMDB Logo"
          style={{ width: '200px', height: 'auto' }}
        />
      </a>
      <p>This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
    </div>
  );
}
