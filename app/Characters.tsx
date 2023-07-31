import Image from "next/image";

export default function Characters({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <>
      {name === "Yoda" && (
        <Image
          src={"/profile/yoda.png"}
          width={27}
          height={20}
          alt="Yoda"
          className={className}
        />
      )}
      {name.includes("Little Anakin") && (
        <Image
          src={"/profile/little-anakin.png"}
          width={20}
          height={20}
          alt="Little Anakin Skywalker"
          className={className}
        />
      )}

      {name === "Jar Jar" && (
        <Image
          src={"/profile/jar-jar.png"}
          width={20}
          height={20}
          alt="Jar Jar"
          className={className}
        />
      )}
      {name === "Darth Vader" && (
        <Image
          src={"/profile/darth-vader.png"}
          width={20}
          height={20}
          alt="Darth Vader"
          className={className}
        />
      )}
      {name === "Geralt of Rivia" && (
        <Image
          src={"/profile/geralt.png"}
          width={20}
          height={20}
          alt="Geralt of Rivia"
          className={className}
        />
      )}
      {name === "Town's Guard" && (
        <Image
          src={"/profile/guard.png"}
          width={20}
          height={20}
          alt="Guard from Skyrim"
          className={className}
        />
      )}

      {name === "Obi-Wan Kenobi" && (
        <Image
          src={"/profile/obi.png"}
          width={20}
          height={20}
          alt="Obi-Wan Kenobi"
          className={className}
        />
      )}
      {name === "Anakin Skywalker" && (
        <Image
          src={"/profile/anakin.png"}
          width={20}
          height={20}
          alt="Anakin Skywalker"
          className={className}
        />
      )}

      {name === "Bilbo Baggins" && (
        <Image
          src={"/profile/bilbo-baggins.png"}
          width={20}
          height={20}
          alt="Bilbo Baggins"
          className={className}
        />
      )}
      {name === "Indiana Jones" && (
        <Image
          src={"/profile/indiana-jones.png"}
          width={20}
          height={20}
          alt="Indiana Jones"
          className={className}
        />
      )}
      {name === "Gollum" && (
        <Image
          src={"/profile/gollum.png"}
          width={20}
          height={20}
          alt="Gollum"
          className={className}
        />
      )}
      {name === "Samwise Gamgee" && (
        <Image
          src={"/profile/sam.png"}
          width={20}
          height={20}
          alt="Samwise Gamgee"
          className={className}
        />
      )}
      {name === "Frodo Baggins" && (
        <Image
          src={"/profile/frodo.png"}
          width={20}
          height={20}
          alt="Frodo Baggins"
          className={className}
        />
      )}
      {name.includes("Jack Sparrow") && (
        <Image
          src={"/profile/jack-sparrow.png"}
          width={20}
          height={20}
          alt="Captain Jack Sparrow"
          className={className}
        />
      )}
      {name === "Sherry" && (
        <Image
          src={"/profile/sherry.png"}
          width={20}
          height={20}
          alt="Sherry"
          className={className}
        />
      )}
      {name === "Morton" && (
        <Image
          src={"/profile/morton-1.png"}
          width={20}
          height={20}
          alt="Morton"
          className={className}
        />
      )}
    </>
  );
}
