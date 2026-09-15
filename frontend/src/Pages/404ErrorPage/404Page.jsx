import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <StyledWrapper>
      <div className="error-container">

        {/* Decorative elements */}
        <div className="decor decor-one" />
        <div className="decor decor-two" />

        {/* Brand */}
        <div className="brand">
          <span className="brand-line" />
          <span>KEMORA</span>
          <span className="brand-line" />
        </div>

        {/* Animated Face */}
        <main className="my-custom-face-container">
          <svg className="face" viewBox="0 0 320 380">
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={25}
            >
              <g className="face__eyes" transform="translate(0,112.5)">
                <g transform="translate(15,0)">
                  <polyline
                    className="face__eye-lid"
                    points="37,0 0,120 75,120"
                  />

                  <polyline
                    className="face__pupil"
                    points="55,120 55,155"
                    strokeDasharray="35 35"
                  />
                </g>

                <g transform="translate(230,0)">
                  <polyline
                    className="face__eye-lid"
                    points="37,0 0,120 75,120"
                  />

                  <polyline
                    className="face__pupil"
                    points="55,120 55,155"
                    strokeDasharray="35 35"
                  />
                </g>
              </g>

              <rect
                className="face__nose"
                x="132.5"
                y="112.5"
                width={55}
                height={155}
                rx={4}
                ry={4}
              />

              <g transform="translate(65,334)" strokeDasharray="102 102">
                <path
                  className="face__mouth-left"
                  d="M 0 30 C 0 30 40 0 95 0"
                />

                <path
                  className="face__mouth-right"
                  d="M 95 0 C 150 0 190 30 190 30"
                />
              </g>
            </g>
          </svg>
        </main>

        {/* Error text */}
        <div className="content">
          <div className="error-code">
            <span>404 — PAGE NOT FOUND</span>
          </div>

          <h1>Looks like you got lost.</h1>

          <p>
            The page you're looking for doesn't exist or the URL you entered
            is invalid. Don't worry, Egypt is still waiting for you.
          </p>

          <Link to="/" className="home-button">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Bottom decoration */}
        <div className="bottom-decoration">
          <span />
          <span />
          <span />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  background: #f7f4ee;
  color: #1e293b;

  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  .error-container {
    position: relative;

    min-height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 40px 24px;

    overflow: hidden;
  }


  .decor {
    position: absolute;

    border: 1px solid rgba(184, 149, 90, 0.18);

    border-radius: 999px;

    pointer-events: none;
  }

  .decor-one {
    width: 420px;
    height: 420px;

    top: -220px;
    right: -180px;
  }

  .decor-two {
    width: 300px;
    height: 300px;

    bottom: -180px;
    left: -150px;
  }


  .brand {
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: 10px;

    font-family: "Cinzel", serif;
    font-size: 14px;
    font-weight: 600;

    letter-spacing: 0.35em;

    color: #9a783f;
  }

  .brand-line {
    width: 28px;
    height: 1px;

    background: #b8955a;
  }

  .my-custom-face-container {
    display: flex;

    justify-content: center;
    align-items: center;

    height: 300px;

    background: transparent;

    color: #b8955a;
  }

  .my-custom-face-container .face {
    width: 190px;
    max-width: 80vw;
  }

  .my-custom-face-container .face__eyes,
  .my-custom-face-container .face__eye-lid,
  .my-custom-face-container .face__mouth-left,
  .my-custom-face-container .face__mouth-right,
  .my-custom-face-container .face__nose,
  .my-custom-face-container .face__pupil {
    animation: eyes 1s 0.3s forwards;
  }

  .my-custom-face-container .face__eye-lid,
  .my-custom-face-container .face__pupil {
    animation-duration: 4s;
    animation-delay: 1.3s;
    animation-iteration-count: infinite;
  }

  .my-custom-face-container .face__eye-lid {
    animation-name: eye-lid;
  }

  .my-custom-face-container .face__mouth-left {
    animation-name: mouth-left;
  }

  .my-custom-face-container .face__mouth-right {
    animation-name: mouth-right;
  }

  .my-custom-face-container .face__nose {
    animation-name: nose;
  }

  .my-custom-face-container .face__pupil {
    animation-name: pupil;
  }


  .content {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 620px;

    text-align: center;
  }

  .error-code {
    display: flex;
    align-items: center;
    gap: 8px;

    margin-bottom: 14px;

    font-family: "Manrope", sans-serif;
    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.18em;

    color: #a27f48;
  }

  .content h1 {
    margin: 0;

    font-family: "Cinzel", serif;

    font-size: clamp(30px, 5vw, 48px);
    font-weight: 600;

    line-height: 1.2;

    color: #1e293b;
  }

  .content p {
    max-width: 540px;

    margin: 18px auto 28px;

    font-family: "Manrope", sans-serif;

    font-size: 15px;
    line-height: 1.8;

    color: #64748b;
  }


  .home-button {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    gap: 9px;

    padding: 12px 22px;

    border: 1px solid #b8955a;
    border-radius: 8px;

    background: #b8955a;
    color: white;

    font-family: "Manrope", sans-serif;
    font-size: 14px;
    font-weight: 600;

    text-decoration: none;

    transition:
      transform 0.25s ease,
      background-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .home-button:hover {
    transform: translateY(-2px);

    background: #a27f48;

    box-shadow: 0 10px 25px rgba(162, 127, 72, 0.2);
  }

  .home-button:active {
    transform: translateY(0);
  }

  .bottom-decoration {
    position: absolute;

    bottom: 28px;

    display: flex;
    align-items: center;
    gap: 7px;
  }

  .bottom-decoration span {
    display: block;

    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: #b8955a;

    opacity: 0.5;
  }

  .bottom-decoration span:nth-child(2) {
    width: 8px;
    height: 8px;

    opacity: 0.8;
  }


  @keyframes eye-lid {
    0%,
    40%,
    45%,
    100% {
      transform: translateY(0);
    }

    42.5% {
      transform: translateY(17.5px);
    }
  }

  @keyframes eyes {
    from {
      transform: translateY(112.5px);
    }

    to {
      transform: translateY(15px);
    }
  }

  @keyframes pupil {
    0%,
    37.5%,
    40%,
    45%,
    87.5%,
    100% {
      stroke-dashoffset: 0;
      transform: translate(0, 0);
    }

    12.5%,
    25%,
    62.5%,
    75% {
      transform: translate(-35px, 0);
    }

    42.5% {
      stroke-dashoffset: 35;
      transform: translate(0, 17.5px);
    }
  }

  @keyframes mouth-left {
    from,
    50% {
      stroke-dashoffset: -102;
    }

    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes mouth-right {
    from,
    50% {
      stroke-dashoffset: 102;
    }

    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes nose {
    from {
      transform: translate(0, 0);
    }

    to {
      transform: translate(0, 22.5px);
    }
  }


  :global(.dark) & {
    background: #121212;
    color: #f5f5f5;
  }

  :global(.dark) & .decor {
    border-color: rgba(212, 175, 95, 0.14);
  }

  :global(.dark) & .brand {
    color: #d4af5f;
  }

  :global(.dark) & .content h1 {
    color: #f5f5f5;
  }

  :global(.dark) & .content p {
    color: #a1a1aa;
  }

  :global(.dark) & .error-code {
    color: #d4af5f;
  }

  :global(.dark) & .my-custom-face-container {
    color: #d4af5f;
  }

  :global(.dark) & .home-button {
    background: #d4af5f;
    border-color: #d4af5f;
    color: #121212;
  }

  :global(.dark) & .home-button:hover {
    background: #e0bd70;
    box-shadow: 0 10px 25px rgba(212, 175, 95, 0.15);
  }



  @media (max-width: 640px) {
    .error-container {
      padding: 30px 20px;
    }

    .brand {
      font-size: 12px;
    }

    .my-custom-face-container {
      height: 260px;
    }

    .my-custom-face-container .face {
      width: 160px;
    }

    .content p {
      font-size: 14px;
    }

    .decor-one {
      width: 280px;
      height: 280px;

      top: -150px;
      right: -130px;
    }

    .decor-two {
      width: 220px;
      height: 220px;

      bottom: -130px;
      left: -120px;
    }
  }
`;

export default ErrorPage;