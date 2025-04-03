type AboutType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  bio?: string;
  phoneNumber?: string;
  profileImage?: string;
  skills?: string[];
  socials?: {
    platformLogo?: string;
    url?: string;
  }[];
};

export default AboutType;
