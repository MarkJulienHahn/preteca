import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import PortableText from "react-portable-text";

import styles from "../../styles/Project.module.css";

import Headline from "../about/Headline";
import Footer from "../Footer";
import ProjectImage from "./ProjectImage";

const Project = ({
  lang,
  setLang,
  projIndex,
  projects,
  showProject,
  setShowProject,
  setShowNav,
  setShowPrivacy,
  setShowImprint,
  showNav,
}) => {
  const [credits, setCredits] = useState(false);
  const [height, setHeight] = useState();
  const [loaded, setLoaded] = useState(false);

  const [project, setProject] = useState(projects[projIndex]);

  const ref2 = useRef();
  const topRef = useRef();

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  const scrollUp = () => {
    topRef.current?.scrollIntoView();
  };

  const resetProject = () => {
    setProject(null);
  };

  useEffect(() => {
    setHeight(ref2.current?.clientHeight);
    !showProject ?? setCredits(false);
  });

  useEffect(() => {
    setProject(projects[projIndex]);
    !showProject && setTimeout(scrollUp, 500) && setCredits(false);
    showProject &&
      history.replaceState(
        { query: projIndex, slug: projects[projIndex].slug },
        `/${projects[projIndex].slug}`,
        `${projects[projIndex].slug}`
      );

    !showProject && history.replaceState(null, "/", "/");
  }, [showProject]);

  useEffect(() => {
    !showProject && setShowNav(true);
    !showProject && setTimeout(resetProject, 500);
  }, [showProject]);

  useEffect(() => {
    window && setLoaded(true);
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${
        showProject ? styles.active : styles.inActive
      }`}
    >
      {showProject && (
        <>
          <div
            className={styles.infoOuter}
            style={!inView ? { opacity: "1" } : { opacity: "0" }}
          >
            <div className={styles.info}>
              <h1 onClick={() => setCredits(!credits)}>{project?.name}</h1>
              <div
                className={styles.credits}
                style={
                  credits && !inView
                    ? { height: height, opacity: "1" }
                    : { height: "0px", opacity: "0" }
                }
              >
                <div ref={ref2} style={{ paddingBottom: "30px" }}>
                  <div
                    style={{
                      pointerEvents: credits ? "auto" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setCredits(!credits)}
                  >
                    {project?.textEn && project?.textDe ? (
                      <PortableText
                        content={
                          lang == "en" ? project?.textEn : project?.textDe
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <p
                className={styles.infoButton}
                onClick={() => setCredits(!credits)}
              >
                {lang == "en" ? (!credits ? "More Info" : "Less Info") : ""}
                {lang == "de" ? (!credits ? "Mehr Infos" : "Weniger Info") : ""}
              </p>
            </div>
          </div>

          <div
            className={styles.background}
            style={{ opacity: !credits ? "0.4" : "1" }}
          ></div>
        </>
      )}
      <div className={styles.inner}>
        {showProject && (
          <Headline title={""} close={() => setShowProject(false)} />
        )}
        <div ref={topRef}></div>

        {loaded
          ? project?.images.map((image, i) => (
              <div className={styles.image} key={i}>
                {image.credit ? (
                  <div className={styles.imageCredit}>©{image.credit}</div>
                ) : (
                  ""
                )}
                <ProjectImage image={image} i={i} />
              </div>
            ))
          : ""}

        <div
          className={styles.footerWrapper}
          style={inView ? { opacity: "1" } : { opacity: "0" }}
          ref={ref}
        >
          <Footer
            white={true}
            lang={lang}
            setLang={setLang}
            setShowNav={setShowNav}
            showNav={showNav}
            setShowImprint={setShowImprint}
            setShowPrivacy={setShowPrivacy}
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
