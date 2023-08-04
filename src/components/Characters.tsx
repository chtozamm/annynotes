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
          src={"/pictures/yoda.png"}
          width={27}
          height={20}
          alt="Yoda"
          className={className}
        />
      )}
      {name.includes("Little Anakin") && (
        <Image
          src={"/pictures/little-anakin.png"}
          width={20}
          height={20}
          alt="Little Anakin Skywalker"
          className={className}
        />
      )}

      {name === "Jar Jar" && (
        <Image
          src={"/pictures/jar-jar.png"}
          width={20}
          height={20}
          alt="Jar Jar"
          className={className}
        />
      )}
      {name === "Darth Vader" && (
        <Image
          src={"/pictures/darth-vader.png"}
          width={20}
          height={20}
          alt="Darth Vader"
          className={className}
        />
      )}
      {name === "Geralt of Rivia" && (
        <Image
          src={"/pictures/geralt.png"}
          width={20}
          height={20}
          alt="Geralt of Rivia"
          className={className}
        />
      )}
      {name === "Town's Guard" && (
        <Image
          src={"/pictures/guard.png"}
          width={20}
          height={20}
          alt="Guard from Skyrim"
          className={className}
        />
      )}

      {name === "Obi-Wan Kenobi" && (
        <Image
          src={"/pictures/obi.png"}
          width={20}
          height={20}
          alt="Obi-Wan Kenobi"
          className={className}
        />
      )}
      {name === "Anakin Skywalker" && (
        <Image
          src={"/pictures/anakin.png"}
          width={20}
          height={20}
          alt="Anakin Skywalker"
          className={className}
        />
      )}

      {name === "Bilbo Baggins" && (
        <Image
          src={"/pictures/bilbo-baggins.png"}
          width={20}
          height={20}
          alt="Bilbo Baggins"
          className={className}
        />
      )}
      {name === "Indiana Jones" && (
        <Image
          src={"/pictures/indiana-jones.png"}
          width={20}
          height={20}
          alt="Indiana Jones"
          className={className}
        />
      )}
      {name === "Gollum" && (
        <Image
          src={"/pictures/gollum.png"}
          width={20}
          height={20}
          alt="Gollum"
          className={className}
        />
      )}
      {name === "Samwise Gamgee" && (
        <Image
          src={"/pictures/sam.png"}
          width={20}
          height={20}
          alt="Samwise Gamgee"
          className={className}
        />
      )}
      {name === "Frodo Baggins" && (
        <Image
          src={"/pictures/frodo.png"}
          width={20}
          height={20}
          alt="Frodo Baggins"
          className={className}
        />
      )}
      {name.includes("Jack Sparrow") && (
        <Image
          src={"/pictures/jack-sparrow.png"}
          width={20}
          height={20}
          alt="Captain Jack Sparrow"
          className={className}
        />
      )}
      {name === "Sherry" && (
        <Image
          src={"/pictures/sherry.png"}
          width={20}
          height={20}
          alt="Sherry"
          className={className}
        />
      )}
      {name === "Morton" && (
        <Image
          src={"/pictures/morton-1.png"}
          width={20}
          height={20}
          alt="Morton"
          className={className}
        />
      )}
    </>
  );
}
