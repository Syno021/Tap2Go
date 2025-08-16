import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },

  /** HEADER **/
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF5E6',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d2d2d",
  },
  backBtn: {
    fontSize: 16,
    color: "#f57c00",
    fontWeight: "bold",
  },

  /** CARDS CONTAINER **/
  cardsContainer: {
    width: "100%",
    maxWidth: 400,
    marginTop: 80,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  card: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    ...(Platform.OS === 'web' 
      ? { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }
      : Platform.OS === 'ios'
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }
      : {
          elevation: 4,
        }
    ),
  },
  registerCard: {
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#1a1a1a",
  },

  /** FORM **/
  input: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  primaryBtn: {
    backgroundColor: "#f57c00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  /** LINKS **/
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#555",
  },
  link: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f57c00",
  },

  /** REGISTER BACK BUTTON **/
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backButtonText: {
    color: "#f57c00",
    fontSize: 16,
    fontWeight: "bold",
  },
});
